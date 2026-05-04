import { useEffect } from 'react';
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
import { useCatalogData, CATALOG_PAGE_SIZE } from '../../hooks';

// ── Sub-components ──────────────────────────────────────────────────────────

const GRID_COLUMNS = {
  xs: '1fr',
  sm: 'repeat(2, 1fr)',
  lg: 'repeat(3, 1fr)',
};

function CatalogLoadingSkeleton() {
  return (
    <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: GRID_COLUMNS }}>
      {Array.from({ length: CATALOG_PAGE_SIZE }).map((_, i) => (
        <BookCardSkeleton key={`catalog-skeleton-${i}`} />
      ))}
    </Box>
  );
}

function CatalogEmptyState({ onClear }: { onClear: () => void }) {
  return (
    <Fade in timeout={300}>
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent>
          <Stack spacing={1.5} sx={{ alignItems: 'flex-start' }}>
            <Typography variant="h6">No encontramos libros</Typography>
            <Typography color="text.secondary">
              Prueba ajustando los filtros o limpia la búsqueda para ver más opciones.
            </Typography>
            <Button variant="contained" onClick={onClear}>
              Limpiar filtros
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Fade>
  );
}

function CatalogErrorState({ message }: { message: string }) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <CardContent>
        <Stack spacing={1.5}>
          <Typography variant="subtitle1" color="error">
            {message}
          </Typography>
          <Button variant="outlined" onClick={() => window.location.reload()}>
            Reintentar
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

// ── Main page ───────────────────────────────────────────────────────────────

function CatalogPage() {
  const {
    loading,
    error,
    metadata,
    params,
    setParams,
    filteredBooks,
    pagedBooks,
    totalPages,
    activeFiltersCount,
    handleClearFilters,
    handleApplyFilters,
  } = useCatalogData();

  // Scroll to top on initial mount (UI concern, not in data hook)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setParams({ page: value });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <Box sx={{ py: { xs: 3, md: 5 } }}>
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <CatalogHeader />
            <CatalogErrorState message={error} />
          </Stack>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 3, md: 5 } }}>
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <CatalogHeader />

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
                  search: params.search,
                  categoryId: params.categoryId,
                  format: params.format,
                  language: params.language,
                  priceRange: params.priceRange,
                }}
                categories={metadata.categories}
                languages={metadata.languages}
                activeFiltersCount={activeFiltersCount}
                onApplyFilters={handleApplyFilters}
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

              {loading && <CatalogLoadingSkeleton />}

              {!loading && filteredBooks.length === 0 && (
                <CatalogEmptyState onClear={handleClearFilters} />
              )}

              {!loading && filteredBooks.length > 0 && (
                <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: GRID_COLUMNS }}>
                  {pagedBooks.map(book => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </Box>
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
        </Stack>
      </Container>
    </Box>
  );
}

function CatalogHeader() {
  return (
    <Stack spacing={1}>
      <Typography variant="h3">Catálogo</Typography>
      <Typography color="text.secondary">
        Explora libros físicos y digitales y ajusta los filtros según tu lectura ideal.
      </Typography>
    </Stack>
  );
}

export default CatalogPage;
