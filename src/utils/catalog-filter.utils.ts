import type { Book } from '../types';
import type {
  CatalogFilterValues,
  CatalogPriceRange,
  CatalogSortBy,
  CatalogSortOrder,
} from '../types/catalog.types';

export const roundPrice = (value: number): number => Math.round(value * 100) / 100;

export const parsePriceInput = (value: string): number | null => {
  if (!value.trim()) return null;

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const normalizePriceRange = (
  minValue: number | null,
  maxValue: number | null
): CatalogPriceRange => {
  const safeMin = minValue !== null ? roundPrice(minValue) : null;
  const safeMax = maxValue !== null ? roundPrice(maxValue) : null;

  if (safeMin !== null && safeMax !== null) {
    return [Math.min(safeMin, safeMax), Math.max(safeMin, safeMax)];
  }
  return [safeMin ?? 0, safeMax ?? Infinity];
};

export const isPriceRangeActive = (priceRange: CatalogPriceRange): boolean => {
  return priceRange[0] > 0 || priceRange[1] !== Infinity;
};

export const filterBooks = (books: Book[], filters: CatalogFilterValues): Book[] => {
  const q = filters.search.trim().toLowerCase();
  const priceActive = isPriceRangeActive(filters.priceRange);

  return books.filter(book => {
    const matchesSearch =
      !q || book.title.toLowerCase().includes(q) || book.author.toLowerCase().includes(q);
    const matchesCategory =
      filters.categoryId === 'all' ||
      book.categories.some(category => category.id === filters.categoryId);
    const matchesFormat = filters.format === 'all' || book.format === filters.format;
    const matchesLanguage =
      filters.language === 'all' ||
      book.language.toLowerCase() === String(filters.language).toLowerCase();
    const matchesPrice =
      !priceActive || (book.price >= filters.priceRange[0] && book.price <= filters.priceRange[1]);

    return matchesSearch && matchesCategory && matchesFormat && matchesLanguage && matchesPrice;
  });
};

export const sortBooks = (
  books: Book[],
  sortBy: CatalogSortBy,
  sortOrder: CatalogSortOrder
): Book[] => {
  const direction = sortOrder === 'desc' ? -1 : 1;

  return [...books].sort((a, b) => {
    if (sortBy === 'title') return direction * a.title.localeCompare(b.title);
    if (sortBy === 'price') return direction * (a.price - b.price);
    if (sortBy === 'rating') return direction * (a.rating - b.rating);
    return direction * (a.year - b.year);
  });
};

export const getVisibleCatalogBooks = (
  books: Book[],
  filters: CatalogFilterValues,
  sortBy: CatalogSortBy,
  sortOrder: CatalogSortOrder
): Book[] => {
  const filtered = filterBooks(books, filters);
  const priceFilterActive = isPriceRangeActive(filters.priceRange);

  return sortBooks(
    filtered,
    priceFilterActive ? 'price' : sortBy,
    priceFilterActive ? 'asc' : sortOrder
  );
};
