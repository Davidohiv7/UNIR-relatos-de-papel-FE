import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { CATALOG_PARAMS } from '../../config/navigation/navigation.config';
import type { CatalogSortBy, CatalogSortOrder } from '../../components/catalog';
import type { BookFiltersMetadata } from '../../services';
import { BookFormat } from '../../types';

const VALID_SORT_BY: CatalogSortBy[] = ['title', 'price', 'rating', 'year'];
const VALID_SORT_ORDER: CatalogSortOrder[] = ['asc', 'desc'];
const VALID_FORMATS = [BookFormat.PHYSICAL, BookFormat.DIGITAL] as string[];

export type CatalogParams = {
  search: string;
  categoryId: number | 'all';
  format: BookFormat | 'all';
  language: string | 'all';
  priceRange: [number, number];
  sortBy: CatalogSortBy;
  sortOrder: CatalogSortOrder;
  page: number;
};

type SetterFn = (
  patch: Partial<Omit<CatalogParams, 'priceRange'> & { priceRange?: [number, number] }>
) => void;

function readParams(
  params: URLSearchParams,
  priceLimits: { min: number; max: number }
): CatalogParams {
  const p = CATALOG_PARAMS;

  const search = params.get(p.search) ?? '';

  const catRaw = params.get(p.category);
  const categoryId: number | 'all' = catRaw && !isNaN(Number(catRaw)) ? Number(catRaw) : 'all';

  const fmtRaw = params.get(p.format) ?? '';
  const format: BookFormat | 'all' = VALID_FORMATS.includes(fmtRaw)
    ? (fmtRaw as BookFormat)
    : 'all';

  const language: string | 'all' = params.get(p.language) ?? 'all';

  const minRaw = params.get(p.minPrice);
  const maxRaw = params.get(p.maxPrice);
  const minPrice = minRaw !== null && !isNaN(Number(minRaw)) ? Number(minRaw) : priceLimits.min;
  const maxPrice = maxRaw !== null && !isNaN(Number(maxRaw)) ? Number(maxRaw) : priceLimits.max;
  const priceRange: [number, number] = [
    Math.max(priceLimits.min, Math.min(minPrice, priceLimits.max)),
    Math.min(priceLimits.max, Math.max(maxPrice, priceLimits.min)),
  ];

  const sortByRaw = params.get(p.sortBy) ?? '';
  const sortBy: CatalogSortBy = VALID_SORT_BY.includes(sortByRaw as CatalogSortBy)
    ? (sortByRaw as CatalogSortBy)
    : 'title';

  const sortOrderRaw = params.get(p.sortOrder) ?? '';
  const sortOrder: CatalogSortOrder = VALID_SORT_ORDER.includes(sortOrderRaw as CatalogSortOrder)
    ? (sortOrderRaw as CatalogSortOrder)
    : 'asc';

  const pageRaw = params.get(p.page);
  const page = pageRaw && !isNaN(Number(pageRaw)) && Number(pageRaw) > 0 ? Number(pageRaw) : 1;

  return { search, categoryId, format, language, priceRange, sortBy, sortOrder, page };
}

function writeParams(
  current: URLSearchParams,
  patch: Parameters<SetterFn>[0],
  priceLimits: { min: number; max: number }
): URLSearchParams {
  const next = new URLSearchParams(current);
  const p = CATALOG_PARAMS;

  if ('search' in patch) {
    if (patch.search?.trim()) next.set(p.search, patch.search.trim());
    else next.delete(p.search);
  }
  if ('categoryId' in patch) {
    if (patch.categoryId && patch.categoryId !== 'all')
      next.set(p.category, String(patch.categoryId));
    else next.delete(p.category);
  }
  if ('format' in patch) {
    if (patch.format && patch.format !== 'all') next.set(p.format, patch.format);
    else next.delete(p.format);
  }
  if ('language' in patch) {
    if (patch.language && patch.language !== 'all') next.set(p.language, patch.language);
    else next.delete(p.language);
  }
  if ('priceRange' in patch && patch.priceRange) {
    const [lo, hi] = patch.priceRange;
    if (lo > priceLimits.min) next.set(p.minPrice, String(lo));
    else next.delete(p.minPrice);
    if (hi < priceLimits.max) next.set(p.maxPrice, String(hi));
    else next.delete(p.maxPrice);
  }
  if ('sortBy' in patch) {
    if (patch.sortBy && patch.sortBy !== 'title') next.set(p.sortBy, patch.sortBy);
    else next.delete(p.sortBy);
  }
  if ('sortOrder' in patch) {
    if (patch.sortOrder && patch.sortOrder !== 'asc') next.set(p.sortOrder, patch.sortOrder);
    else next.delete(p.sortOrder);
  }

  // Reset page to 1 for any filter/sort change unless page itself is being set
  if (!('page' in patch)) next.delete(p.page);

  if ('page' in patch) {
    if (patch.page && patch.page > 1) next.set(p.page, String(patch.page));
    else next.delete(p.page);
  }

  return next;
}

export function useCatalogSearchParams(metadata: BookFiltersMetadata) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsKey = searchParams.toString();

  const priceLimits = metadata.priceRange;

  const params: CatalogParams = useMemo(
    () => readParams(searchParams, priceLimits),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParamsKey, priceLimits.min, priceLimits.max]
  );

  const setParams: SetterFn = useCallback(
    patch => {
      setSearchParams(prev => writeParams(prev, patch, priceLimits), { replace: true });
    },
    [setSearchParams, priceLimits]
  );

  const clearParams = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  return { params, setParams, clearParams };
}
