import { useCallback, useEffect, useMemo, useState } from 'react';
import { booksService, type BookFiltersMetadata } from '../../services';
import type { Book, CatalogFilterValues } from '../../types';
import { useCatalogSearchParams } from './use-catalog-search-params.hook';
import { getVisibleCatalogBooks, isPriceRangeActive } from '../../utils/catalog-filter.utils';

export const CATALOG_PAGE_SIZE = 12;

// TODO: Replace with server-side pagination & filtering when API supports it.
// Currently the API does not support filter/sort query params, so we fetch a
// reasonable batch and handle everything client-side.
const CATALOG_FETCH_LIMIT = 1000;

const EMPTY_META: BookFiltersMetadata = {
  categories: [],
  languages: [],
  priceRange: { min: 0, max: 0 },
};

export function useCatalogData() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<BookFiltersMetadata>(EMPTY_META);

  const { params, setParams, clearParams } = useCatalogSearchParams(metadata);

  // ── Fetch data ──
  useEffect(() => {
    const controller = new AbortController();

    Promise.all([
      booksService.getBookFiltersMetadata(controller.signal),
      booksService.getBooks({ page: 1, limit: CATALOG_FETCH_LIMIT }, controller.signal),
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

  // ── Derived: filtered + sorted books ──
  const filteredBooks = useMemo(
    () =>
      getVisibleCatalogBooks(
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
      ),
    [books, params]
  );

  // ── Derived: pagination ──
  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / CATALOG_PAGE_SIZE));

  const pagedBooks = useMemo(() => {
    const start = (params.page - 1) * CATALOG_PAGE_SIZE;
    return filteredBooks.slice(start, start + CATALOG_PAGE_SIZE);
  }, [filteredBooks, params.page]);

  // Clamp page if current page exceeds total after a filter change
  useEffect(() => {
    if (!loading && params.page > totalPages) {
      setParams({ page: totalPages });
    }
  }, [loading, params.page, setParams, totalPages]);

  // ── Derived: active filter badge count ──
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (params.search.trim()) count += 1;
    if (params.categoryId !== 'all') count += 1;
    if (params.format !== 'all') count += 1;
    if (params.language !== 'all') count += 1;
    if (isPriceRangeActive(params.priceRange)) count += 1;
    return count;
  }, [params]);

  // ── Handlers ──
  const handleClearFilters = useCallback(() => {
    clearParams();
  }, [clearParams]);

  const handleApplyFilters = useCallback(
    (val: CatalogFilterValues) => {
      const priceFilterActive = isPriceRangeActive(val.priceRange);
      setParams({
        search: val.search,
        categoryId: val.categoryId,
        format: val.format,
        language: val.language,
        priceRange: val.priceRange,
        ...(priceFilterActive ? { sortBy: 'price' as const, sortOrder: 'asc' as const } : {}),
      });
    },
    [setParams]
  );

  return {
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
  };
}
