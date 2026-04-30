import { API_URL } from '../config';

// ─── Error tipado ──────────────────────────────────────────────────────────

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// ─── Token management ──────────────────────────────────────────────────────

let _accessToken: string | null = null;

/**
 * Hook invocado cuando el servidor responde con 401.
 * Debe intentar renovar el access token y devolverlo, o null si falla.
 * Registro: tokenManager.onTokenExpired(() => refreshAccessToken())
 */
let _onTokenExpired: (() => Promise<string | null>) | null = null;

export const tokenManager = {
  getToken: (): string | null => _accessToken,

  setToken: (token: string): void => {
    _accessToken = token;
  },

  clearToken: (): void => {
    _accessToken = null;
  },

  /**
   * Registra el handler de refresco de token.
   * Llamar una vez al inicializar la app, junto a setToken cuando el usuario inicia sesión.
   */
  onTokenExpired: (handler: () => Promise<string | null>): void => {
    _onTokenExpired = handler;
  },
};

// ─── Helpers ───────────────────────────────────────────────────────────────

export function buildQuery(params?: Record<string, unknown>): string {
  if (!params) return '';
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      search.set(key, String(value));
    }
  }
  const qs = search.toString();
  return qs ? `?${qs}` : '';
}

// ─── Tipos de opciones ─────────────────────────────────────────────────────

export type RequestOptions = {
  signal?: AbortSignal;
  headers?: Record<string, string>;
};

// ─── Núcleo fetch ──────────────────────────────────────────────────────────

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  options: RequestOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = tokenManager.getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal: options.signal,
  });

  // 401 — intentar refresh si hay handler registrado, luego reintentar una vez
  if (response.status === 401 && _onTokenExpired) {
    const newToken = await _onTokenExpired();
    if (newToken) {
      tokenManager.setToken(newToken);
      return request<T>(method, path, body, options);
    }
    tokenManager.clearToken();
    throw new ApiError(401, 'Sesión expirada. Inicia sesión de nuevo.');
  }

  if (!response.ok) {
    let errorData: unknown = null;
    try {
      errorData = await response.json();
    } catch {
      /* body vacío o no JSON */
    }
    throw new ApiError(response.status, response.statusText, errorData);
  }

  // 204 No Content — no hay body que parsear
  if (response.status === 204) return undefined as T;

  return response.json() as Promise<T>;
}

// ─── Cliente HTTP público ──────────────────────────────────────────────────

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions): Promise<T> =>
    request<T>('GET', path, undefined, options),

  post: <T>(path: string, body: unknown, options?: RequestOptions): Promise<T> =>
    request<T>('POST', path, body, options),

  put: <T>(path: string, body: unknown, options?: RequestOptions): Promise<T> =>
    request<T>('PUT', path, body, options),

  patch: <T>(path: string, body: unknown, options?: RequestOptions): Promise<T> =>
    request<T>('PATCH', path, body, options),

  delete: <T = void>(path: string, options?: RequestOptions): Promise<T> =>
    request<T>('DELETE', path, undefined, options),
};
