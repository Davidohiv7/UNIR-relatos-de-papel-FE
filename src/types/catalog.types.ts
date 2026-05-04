import type { BookFormat } from './book.types';

export type CatalogSortBy = 'title' | 'price' | 'rating' | 'year';

export type CatalogSortOrder = 'asc' | 'desc';

export type CatalogPriceRange = [number, number];

export type CatalogFilterValues = {
  search: string;
  categoryId: number | 'all';
  format: BookFormat | 'all';
  language: string | 'all';
  priceRange: CatalogPriceRange;
};
