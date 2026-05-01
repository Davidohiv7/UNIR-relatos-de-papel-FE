// VITE_USE_MOCK=false en .env.production para apuntar a la API real
export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

// VITE_API_URL=https://api.relatosdepapel.com/api en producción
export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';
