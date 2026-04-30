import type { Address } from '../types';

/**
 * Direcciones de envío agrupadas por customerId.
 * La relación customer→addresses vive en el servidor;
 * aquí la simulamos con un Map para el entorno mock.
 */
export const mockAddresses: Map<number, Address[]> = new Map([
  [
    1,
    [
      { id: 1, line1: 'Calle Mayor 12', city: 'Madrid' },
      { id: 2, line1: 'Gran Vía 45, 3º B', city: 'Barcelona' },
    ],
  ],
  [2, [{ id: 3, line1: 'Carrera 7 # 45-23', city: 'Bogotá' }]],
  [3, [{ id: 4, line1: 'Vía Argentina 8', city: 'Ciudad de Panamá' }]],
]);
