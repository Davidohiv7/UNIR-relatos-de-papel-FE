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
