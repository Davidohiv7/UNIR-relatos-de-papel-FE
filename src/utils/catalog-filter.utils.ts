import type { Book } from '../types';
import type {
  CatalogFilterValues,
  CatalogPriceRange,
  CatalogSortBy,
  CatalogSortOrder,
} from '../types/catalog.types';

type PriceLimits = { min: number; max: number };

export const roundPrice = (value: number): number => Math.round(value * 100) / 100;

export const parsePriceInput = (value: string): number | null => {
  if (!value.trim()) return null;

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const normalizePriceRange = (
  minValue: number | null,
  maxValue: number | null,
  priceLimits: PriceLimits
): CatalogPriceRange => {
  const fallbackMin = Number.isFinite(priceLimits.min) ? priceLimits.min : 0;
  const fallbackMax = Number.isFinite(priceLimits.max) ? priceLimits.max : fallbackMin;
  const lowerLimit = Math.min(fallbackMin, fallbackMax);
  const upperLimit = Math.max(fallbackMin, fallbackMax);

  const safeMin = minValue === null ? lowerLimit : minValue;
  const safeMax = maxValue === null ? upperLimit : maxValue;
  const orderedMin = Math.min(safeMin, safeMax);
  const orderedMax = Math.max(safeMin, safeMax);

  return [
    roundPrice(Math.max(lowerLimit, orderedMin)),
    roundPrice(Math.min(upperLimit, orderedMax)),
  ];
};

export const isPriceRangeActive = (
  priceRange: CatalogPriceRange,
  priceLimits: PriceLimits
): boolean => {
  return (
    priceLimits.max > 0 && (priceRange[0] > priceLimits.min || priceRange[1] < priceLimits.max)
  );
};

export const filterBooks = (
  books: Book[],
  filters: CatalogFilterValues,
  priceLimits: PriceLimits
): Book[] => {
  const q = filters.search.trim().toLowerCase();

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
      priceLimits.max <= 0 ||
      (book.price >= filters.priceRange[0] && book.price <= filters.priceRange[1]);

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
  priceLimits: PriceLimits,
  sortBy: CatalogSortBy,
  sortOrder: CatalogSortOrder
): Book[] => {
  const filtered = filterBooks(books, filters, priceLimits);
  const priceFilterActive = isPriceRangeActive(filters.priceRange, priceLimits);

  return sortBooks(
    filtered,
    priceFilterActive ? 'price' : sortBy,
    priceFilterActive ? 'asc' : sortOrder
  );
};
