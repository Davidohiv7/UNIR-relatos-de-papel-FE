import type { Address } from '../../types';
import { mockAddresses } from '../../mocks/addresses.mock';
import { apiClient } from '../api/apiClient';
import { USE_MOCK } from '../config';
import type { CreateAddressDto, UpdateAddressDto } from '../types';

// ─── Mock store mutable ────────────────────────────────────────────────────

function deepCloneMock(source: Map<number, Address[]>): Map<number, Address[]> {
  return new Map([...source.entries()].map(([k, v]) => [k, v.map(a => ({ ...a }))]));
}

function computeMaxId(source: Map<number, Address[]>): number {
  let max = 0;
  for (const addresses of source.values()) {
    for (const a of addresses) {
      if (a.id > max) max = a.id;
    }
  }
  return max;
}

let _store: Map<number, Address[]> = deepCloneMock(mockAddresses);
let _nextId = computeMaxId(mockAddresses) + 1;

// ─── Servicio ──────────────────────────────────────────────────────────────

export const addressesService = {
  /** Todas las direcciones de envío de un cliente */
  async getAddresses(customerId: number, signal?: AbortSignal): Promise<Address[]> {
    if (USE_MOCK) return [...(_store.get(customerId) ?? [])];
    return apiClient.get<Address[]>(`/customers/${customerId}/addresses`, { signal });
  },

  /** Dirección concreta de un cliente; null si no existe */
  async getAddressById(
    customerId: number,
    addressId: number,
    signal?: AbortSignal
  ): Promise<Address | null> {
    if (USE_MOCK) {
      const list = _store.get(customerId) ?? [];
      return list.find(a => a.id === addressId) ?? null;
    }
    try {
      return await apiClient.get<Address>(`/customers/${customerId}/addresses/${addressId}`, {
        signal,
      });
    } catch {
      return null;
    }
  },

  /** Añade una nueva dirección de envío a un cliente */
  async createAddress(
    customerId: number,
    dto: CreateAddressDto,
    signal?: AbortSignal
  ): Promise<Address> {
    if (USE_MOCK) {
      const newAddress: Address = { id: _nextId++, ...dto };
      const list = _store.get(customerId) ?? [];
      _store.set(customerId, [...list, newAddress]);
      return { ...newAddress };
    }
    return apiClient.post<Address>(`/customers/${customerId}/addresses`, dto, { signal });
  },

  /** Actualiza una dirección existente; null si no existe */
  async updateAddress(
    customerId: number,
    addressId: number,
    dto: UpdateAddressDto,
    signal?: AbortSignal
  ): Promise<Address | null> {
    if (USE_MOCK) {
      const list = _store.get(customerId) ?? [];
      const index = list.findIndex(a => a.id === addressId);
      if (index === -1) return null;
      list[index] = { ...list[index], ...dto };
      return { ...list[index] };
    }
    try {
      return await apiClient.patch<Address>(
        `/customers/${customerId}/addresses/${addressId}`,
        dto,
        { signal }
      );
    } catch {
      return null;
    }
  },

  /** Elimina una dirección; devuelve true si existía */
  async deleteAddress(
    customerId: number,
    addressId: number,
    signal?: AbortSignal
  ): Promise<boolean> {
    if (USE_MOCK) {
      const list = _store.get(customerId) ?? [];
      const filtered = list.filter(a => a.id !== addressId);
      if (filtered.length === list.length) return false;
      _store.set(customerId, filtered);
      return true;
    }
    try {
      await apiClient.delete(`/customers/${customerId}/addresses/${addressId}`, { signal });
      return true;
    } catch {
      return false;
    }
  },

  // Utilidad para tests: reinicia el mock store
  _resetMockStore(): void {
    _store = deepCloneMock(mockAddresses);
    _nextId = computeMaxId(mockAddresses) + 1;
  },
};
