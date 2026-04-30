/**
 * Re-exportaciones de compatibilidad.
 * Todo código nuevo debe importar directamente desde './api/apiClient'.
 */
export { ApiError, buildQuery, apiClient, tokenManager } from './api/apiClient';
export type { RequestOptions } from './api/apiClient';
