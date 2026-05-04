export const ROUTES = {
  home: '/',
  catalog: '/catalog',
  book: '/book/:id',
  checkout: '/checkout',
  profile: '/profile',
  storyBook: '/story-book',
  login: '/login',
  notFound: '*',
} as const;

export const NAVIGATION_QUERY_PARAMS = {
  redirect: 'redirect',
} as const;

export const CATALOG_PARAMS = {
  search: 'q',
  category: 'cat',
  format: 'fmt',
  language: 'lang',
  minPrice: 'min',
  maxPrice: 'max',
  sortBy: 'sort',
  sortOrder: 'order',
  page: 'page',
} as const;

type CatalogUrlOptions = {
  search?: string;
  category?: number | 'all';
  format?: string;
  language?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: string;
  page?: number;
};

export function buildCatalogUrl(opts: CatalogUrlOptions = {}): string {
  const params = new URLSearchParams();
  const p = CATALOG_PARAMS;
  if (opts.search?.trim()) params.set(p.search, opts.search.trim());
  if (opts.category && opts.category !== 'all') params.set(p.category, String(opts.category));
  if (opts.format && opts.format !== 'all') params.set(p.format, opts.format);
  if (opts.language && opts.language !== 'all') params.set(p.language, opts.language);
  if (opts.minPrice !== undefined) params.set(p.minPrice, String(opts.minPrice));
  if (opts.maxPrice !== undefined) params.set(p.maxPrice, String(opts.maxPrice));
  if (opts.sortBy && opts.sortBy !== 'title') params.set(p.sortBy, opts.sortBy);
  if (opts.sortOrder && opts.sortOrder !== 'asc') params.set(p.sortOrder, opts.sortOrder);
  if (opts.page && opts.page > 1) params.set(p.page, String(opts.page));
  const qs = params.toString();
  return qs ? `${ROUTES.catalog}?${qs}` : ROUTES.catalog;
}
