import { useEffect, useMemo, useRef, useState } from 'react';
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

const PAGE_SIZE = 12;
const SEARCH_DEBOUNCE_MS = 300;

const emptyMeta: BookFiltersMetadata = {
  categories: [],
  languages: [],
  priceRange: { min: 0, max: 0 },
};

// Debounce hook — local to this module, only for the search input value
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

function CatalogPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<BookFiltersMetadata>(emptyMeta);

  // Local-only input value for the search field so typing feels instant
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, SEARCH_DEBOUNCE_MS);

  // All filter/sort/page state lives in the URL
  const { params, setParams, clearParams } = useCatalogSearchParams(metadata);

  // Sync the URL search param into the local input on first load / external nav
  const didSyncSearch = useRef(false);
  useEffect(() => {
    if (!didSyncSearch.current) {
      setSearchInput(params.search);
      didSyncSearch.current = true;
    }
  }, [params.search]);

  // Push debounced search to URL
  useEffect(() => {
    if (!didSyncSearch.current) return;
    setParams({ search: debouncedSearch });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

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
    let result = [...books];

    const q = params.search.trim().toLowerCase();
    if (q) {
      result = result.filter(
        b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
      );
    }
    if (params.categoryId !== 'all') {
      result = result.filter(b => b.categories.some(c => c.id === params.categoryId));
    }
    if (params.format !== 'all') {
      result = result.filter(b => b.format === params.format);
    }
    if (params.language !== 'all') {
      result = result.filter(
        b => b.language.toLowerCase() === String(params.language).toLowerCase()
      );
    }
    if (metadata.priceRange.max > 0) {
      result = result.filter(
        b => b.price >= params.priceRange[0] && b.price <= params.priceRange[1]
      );
    }

    result.sort((a, b) => {
      const dir = params.sortOrder === 'desc' ? -1 : 1;
      if (params.sortBy === 'title') return dir * a.title.localeCompare(b.title);
      if (params.sortBy === 'price') return dir * (a.price - b.price);
      if (params.sortBy === 'rating') return dir * (a.rating - b.rating);
      return dir * (a.year - b.year);
    });

    return result;
  }, [books, params, metadata.priceRange.max]);

  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / PAGE_SIZE));
  const pagedBooks = useMemo(() => {
    const start = (params.page - 1) * PAGE_SIZE;
    return filteredBooks.slice(start, start + PAGE_SIZE);
  }, [filteredBooks, params.page]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (params.search.trim()) count += 1;
    if (params.categoryId !== 'all') count += 1;
    if (params.format !== 'all') count += 1;
    if (params.language !== 'all') count += 1;
    if (
      metadata.priceRange.max > 0 &&
      (params.priceRange[0] > metadata.priceRange.min ||
        params.priceRange[1] < metadata.priceRange.max)
    )
      count += 1;
    return count;
  }, [params, metadata.priceRange]);

  const handleClearFilters = () => {
    setSearchInput('');
    clearParams();
  };

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
                  values={{
                    search: searchInput,
                    categoryId: params.categoryId,
                    format: params.format,
                    language: params.language,
                    priceRange: params.priceRange,
                  }}
                  categories={metadata.categories}
                  languages={metadata.languages}
                  priceLimits={metadata.priceRange}
                  activeFiltersCount={activeFiltersCount}
                  onSearchChange={val => setSearchInput(val)}
                  onCategoryChange={val => setParams({ categoryId: val })}
                  onFormatChange={val => setParams({ format: val })}
                  onLanguageChange={val => setParams({ language: val })}
                  onPriceRangeChange={val => setParams({ priceRange: val })}
                  onClearFilters={handleClearFilters}
                />
              </Box>

              <Stack spacing={2.5}>
                <CatalogToolbar
                  totalResults={loading ? 0 : filteredBooks.length}
                  sortBy={params.sortBy}
                  sortOrder={params.sortOrder}
                  onSortByChange={val => setParams({ sortBy: val })}
                  onSortOrderChange={val => setParams({ sortOrder: val })}
                />

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
                      <BookCardSkeleton key={i} />
                    ))}
                  </Box>
                )}

                {!loading && filteredBooks.length === 0 && (
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

                {!loading && filteredBooks.length > 0 && (
                  <Fade in timeout={250}>
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
                  </Fade>
                )}

                {!loading && filteredBooks.length > 0 && totalPages > 1 && (
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
