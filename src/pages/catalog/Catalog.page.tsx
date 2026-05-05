import { useEffect } from 'react';
import { Box, Container, Pagination, Stack } from '@mui/material';

import { BookCard } from '../../components/book';
import { CatalogFilters, CatalogToolbar } from '../../components/catalog';
import { useCatalogData } from '../../hooks';
import CatalogErrorState from '../../components/catalog/CatalogErrorState';
import CatalogLoadingSkeleton from '../../components/catalog/CatalogLoadingSkeleton';
import { CATALOG_DEFAULT_PAGE_SIZE, CATALOG_GRID_COLUMNS } from '../../constants/catalgo.constants';
import CatalogEmptyState from '../../components/catalog/CatalogEmptyState';
import CatalogHeader from '../../components/catalog/CatalogHeader';

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
  } = useCatalogData(CATALOG_DEFAULT_PAGE_SIZE);

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

  // ✨ Agrupamos los valores de los filtros para usarlos tanto en inicialización como en la key
  const currentFilterValues = {
    search: params.search,
    categoryId: params.categoryId,
    format: params.format,
    language: params.language,
    priceRange: params.priceRange,
  };

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
                // ✨ LA MAGIA: Cuando el estado externo de los filtros cambia (ej. limpiar filtros),
                // el string cambia, React destruye el componente viejo y crea uno nuevo.
                key={JSON.stringify(currentFilterValues)}
                initialValues={currentFilterValues}
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

              {loading && <CatalogLoadingSkeleton pageSize={CATALOG_DEFAULT_PAGE_SIZE} />}

              {!loading && filteredBooks.length === 0 && (
                <CatalogEmptyState onClear={handleClearFilters} />
              )}

              {!loading && filteredBooks.length > 0 && (
                <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: CATALOG_GRID_COLUMNS }}>
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

export default CatalogPage;
