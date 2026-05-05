export const CATALOG_GRID_COLUMNS = {
  xs: '1fr',
  sm: 'repeat(2, 1fr)',
  lg: 'repeat(3, 1fr)',
};

export const CATALOG_DEFAULT_PAGE_SIZE = 12;

// TODO: Replace with server-side pagination & filtering when API supports it.
// Currently the API does not support filter/sort query params, so we fetch a
// reasonable batch and handle everything client-side.
export const CATALOG_FETCH_LIMIT = 1000;
