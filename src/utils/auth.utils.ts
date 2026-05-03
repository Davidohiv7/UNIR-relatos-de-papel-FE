import type { Location } from 'react-router';
import { NAVIGATION_QUERY_PARAMS, ROUTES } from '../config/navigation/navigation.config';

const getRedirectFromLocation = (location: Location) => {
  return `${location.pathname}${location.search}${location.hash}`;
};

const getProtectedRouteRedirect = (location: Location) => {
  const redirect = getRedirectFromLocation(location);
  return `${ROUTES.login}?${NAVIGATION_QUERY_PARAMS.redirect}=${redirect}`;
};

const getPostLoginRedirect = (search: string) => {
  const params = new URLSearchParams(search);
  return params.get(NAVIGATION_QUERY_PARAMS.redirect) ?? ROUTES.catalog;
};

export { getProtectedRouteRedirect, getPostLoginRedirect };
