import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Fade,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';

import { BookCard, BookCardSkeleton } from '../../components/book';
import { CatalogFilters, CatalogToolbar } from '../../components/catalog';
import { booksService, type BookFiltersMetadata } from '../../services';
import { useCatalogSearchParams } from '../../hooks';
import type { Book } from '../../types';
import { getVisibleCatalogBooks, isPriceRangeActive } from '../../utils/catalog-filter.utils';

const PAGE_SIZE = 12;
const emptyMeta: BookFiltersMetadata = {
  categories: [],
  languages: [],
  priceRange: { min: 0, max: 0 },
};

function CatalogPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<BookFiltersMetadata>(emptyMeta);
  const didMountRef = useRef(false);
  // All filter/sort/page state lives in the URL
  const { params, setParams, clearParams } = useCatalogSearchParams(metadata);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  // Load books + metadata once
  useEffect(() => {
    const controller = new AbortController();

    Promise.all([
      booksService.getBookFiltersMetadata(controller.signal),
      booksService.getBooks({ page: 1, limit: 1000 }, controller.signal),
    ])
      .then(([meta, response]) => {
        setMetadata(meta);
        setBooks(response.data);
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setError('No pudimos cargar el catálogo. Intenta de nuevo en unos segundos.');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  // Derived: filtered + sorted list
  const filteredBooks = useMemo(() => {
    return getVisibleCatalogBooks(
      books,
      {
        search: params.search,
        categoryId: params.categoryId,
        format: params.format,
        language: params.language,
        priceRange: params.priceRange,
      },
      params.sortBy,
      params.sortOrder
    );
  }, [books, params]);

  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / PAGE_SIZE));
  const pagedBooks = useMemo(() => {
    const start = (params.page - 1) * PAGE_SIZE;
    return filteredBooks.slice(start, start + PAGE_SIZE);
  }, [filteredBooks, params.page]);

  useEffect(() => {
    if (!loading && params.page > totalPages) {
      setParams({ page: totalPages });
    }
  }, [loading, params.page, setParams, totalPages]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (params.search.trim()) count += 1;
    if (params.categoryId !== 'all') count += 1;
    if (params.format !== 'all') count += 1;
    if (params.language !== 'all') count += 1;
    if (isPriceRangeActive(params.priceRange)) count += 1;
    return count;
  }, [params]);

  const priceRangeKey = useMemo(
    () => `${params.priceRange[0]}|${params.priceRange[1]}`,
    [params.priceRange[0], params.priceRange[1]]
  );

  const filtersSignature = useMemo(
    () =>
      [params.search.trim(), params.categoryId, params.format, params.language, priceRangeKey].join(
        '|'
      ),
    [params.search, params.categoryId, params.format, params.language, priceRangeKey]
  );

  useEffect(() => {
    if (loading) return;
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    setFiltering(true);
    const timeout = window.setTimeout(() => setFiltering(false), 350);
    return () => window.clearTimeout(timeout);
  }, [filtersSignature, loading]);

  const handleClearFilters = useCallback(() => {
    setFiltering(true);
    clearParams();
  }, [clearParams]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setParams({ page: value });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ py: { xs: 3, md: 5 } }}>
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography variant="h3">Catálogo</Typography>
            <Typography color="text.secondary">
              Explora libros físicos y digitales y ajusta los filtros según tu lectura ideal.
            </Typography>
          </Stack>

          {error && (
            <Card variant="outlined" sx={{ borderRadius: 3 }}>
              <CardContent>
                <Stack spacing={1.5}>
                  <Typography variant="subtitle1" color="error">
                    {error}
                  </Typography>
                  <Button variant="outlined" onClick={() => window.location.reload()}>
                    Reintentar
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          )}

          {!error && (
            <Box
              sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: { xs: '1fr', md: '280px 1fr', lg: '300px 1fr' },
              }}
            >
              <Box sx={{ alignSelf: 'start' }}>
                <CatalogFilters
                  key={filtersSignature}
                  values={{
                    search: params.search,
                    categoryId: params.categoryId,
                    format: params.format,
                    language: params.language,
                    priceRange: params.priceRange,
                  }}
                  categories={metadata.categories}
                  languages={metadata.languages}
                  activeFiltersCount={activeFiltersCount}
                  onApplyFilters={val => {
                    const priceFilterActive = isPriceRangeActive(val.priceRange);
                    setFiltering(true);
                    setParams({
                      search: val.search,
                      categoryId: val.categoryId,
                      format: val.format,
                      language: val.language,
                      priceRange: val.priceRange,
                      ...(priceFilterActive ? { sortBy: 'price', sortOrder: 'asc' } : {}),
                    });
                  }}
                  onClearFilters={handleClearFilters}
                />
              </Box>

              <Stack spacing={2.5}>
                <CatalogToolbar
                  totalResults={filteredBooks.length}
                  sortBy={params.sortBy}
                  sortOrder={params.sortOrder}
                  onSortByChange={val => setParams({ sortBy: val })}
                  onSortOrderChange={val => setParams({ sortOrder: val })}
                />

                {filtering && !loading && (
                  <Box
                    sx={{
                      display: 'grid',
                      gap: 2,
                      gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        lg: 'repeat(3, 1fr)',
                      },
                    }}
                  >
                    {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                      <BookCardSkeleton key={`catalog-filter-skeleton-${i}`} />
                    ))}
                  </Box>
                )}

                {loading && (
                  <Box
                    sx={{
                      display: 'grid',
                      gap: 2,
                      gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        lg: 'repeat(3, 1fr)',
                      },
                    }}
                  >
                    {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                      <BookCardSkeleton key={`catalog-skeleton-${i}`} />
                    ))}
                  </Box>
                )}

                {!loading && !filtering && filteredBooks.length === 0 && (
                  <Fade in timeout={300}>
                    <Card variant="outlined" sx={{ borderRadius: 3 }}>
                      <CardContent>
                        <Stack spacing={1.5} sx={{ alignItems: 'flex-start' }}>
                          <Typography variant="h6">No encontramos libros</Typography>
                          <Typography color="text.secondary">
                            Prueba ajustando los filtros o limpia la búsqueda para ver más opciones.
                          </Typography>
                          <Button variant="contained" onClick={handleClearFilters}>
                            Limpiar filtros
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Fade>
                )}

                {!loading && !filtering && filteredBooks.length > 0 && (
                  <Box
                    sx={{
                      display: 'grid',
                      gap: 2,
                      gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        lg: 'repeat(3, 1fr)',
                      },
                    }}
                  >
                    {pagedBooks.map(book => (
                      <BookCard key={book.id} book={book} />
                    ))}
                  </Box>
                )}

                {!loading && !filtering && filteredBooks.length > 0 && totalPages > 1 && (
                  <Stack sx={{ alignItems: 'center', pt: 2 }}>
                    <Pagination
                      count={totalPages}
                      page={params.page}
                      onChange={handlePageChange}
                      color="primary"
                      siblingCount={1}
                      boundaryCount={1}
                    />
                  </Stack>
                )}
              </Stack>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export default CatalogPage;
