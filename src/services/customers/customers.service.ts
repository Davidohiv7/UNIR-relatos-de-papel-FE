import type { Customer } from '../../types';
import { mockUsers } from '../../mocks/customer.mock';
import { apiClient } from '../api/apiClient';
import { USE_MOCK } from '../config';
import type {
  LoginDto,
  RegisterDto,
  SafeCustomer,
  UpdateCustomerDto,
  ChangePasswordDto,
} from '../types';

// ─── Mock store mutable ────────────────────────────────────────────────────

let _store: Customer[] = [...mockUsers];
let _nextId = _store.length + 1;

/** Extrae el customer sin exponer la contraseña */
function toSafe({ password: _p, ...rest }: Customer): SafeCustomer {
  void _p;
  return rest;
}

// ─── Servicio ──────────────────────────────────────────────────────────────

export const customersService = {
  // ── CRUD ────────────────────────────────────────────────────────────────

  /** Lista todos los clientes — uso exclusivo de administración */
  async getCustomers(signal?: AbortSignal): Promise<SafeCustomer[]> {
    if (USE_MOCK) return _store.map(toSafe);
    return apiClient.get<SafeCustomer[]>('/customers', { signal });
  },

  /** Devuelve un cliente por id; null si no existe */
  async getCustomerById(id: number, signal?: AbortSignal): Promise<SafeCustomer | null> {
    if (USE_MOCK) {
      const user = _store.find(u => u.id === id);
      return user ? toSafe(user) : null;
    }
    try {
      return await apiClient.get<SafeCustomer>(`/customers/${id}`, { signal });
    } catch {
      return null;
    }
  },

  /**
   * Crea un cliente directamente desde administración.
   * Para el flujo de registro de usuario final, usar registerCustomer.
   */
  async createCustomer(dto: RegisterDto, signal?: AbortSignal): Promise<SafeCustomer> {
    if (USE_MOCK) {
      if (_store.some(u => u.email === dto.email)) {
        throw new Error(`El email ${dto.email} ya está registrado`);
      }
      const newUser: Customer = {
        id: _nextId++,
        ...dto,
        avatar: `${dto.firstName[0]}${dto.lastName[0]}`.toUpperCase(),
      };
      _store.push(newUser);
      return toSafe(newUser);
    }
    return apiClient.post<SafeCustomer>('/customers', dto, { signal });
  },

  /** Actualiza datos de perfil; null si el cliente no existe */
  async updateCustomer(
    id: number,
    dto: UpdateCustomerDto,
    signal?: AbortSignal
  ): Promise<SafeCustomer | null> {
    if (USE_MOCK) {
      const index = _store.findIndex(u => u.id === id);
      if (index === -1) return null;
      _store[index] = { ..._store[index], ...dto };
      return toSafe(_store[index]);
    }
    try {
      return await apiClient.patch<SafeCustomer>(`/customers/${id}`, dto, { signal });
    } catch {
      return null;
    }
  },

  /** Elimina un cliente; devuelve true si existía */
  async deleteCustomer(id: number, signal?: AbortSignal): Promise<boolean> {
    if (USE_MOCK) {
      const index = _store.findIndex(u => u.id === id);
      if (index === -1) return false;
      _store.splice(index, 1);
      return true;
    }
    try {
      await apiClient.delete(`/customers/${id}`, { signal });
      return true;
    } catch {
      return false;
    }
  },

  // ── Autenticación ────────────────────────────────────────────────────────

  /** Registro de nuevo cliente desde el formulario público */
  async registerCustomer(dto: RegisterDto, signal?: AbortSignal): Promise<SafeCustomer> {
    if (USE_MOCK) {
      if (_store.some(u => u.email === dto.email)) {
        throw new Error(`El email ${dto.email} ya está registrado`);
      }
      const newUser: Customer = {
        id: _nextId++,
        ...dto,
        avatar: `${dto.firstName[0]}${dto.lastName[0]}`.toUpperCase(),
      };
      _store.push(newUser);
      return toSafe(newUser);
    }
    return apiClient.post<SafeCustomer>('/auth/register', dto, { signal });
  },

  /** Autenticación; devuelve el cliente sin contraseña o null si las credenciales son incorrectas */
  async loginCustomer(dto: LoginDto, signal?: AbortSignal): Promise<SafeCustomer | null> {
    if (USE_MOCK) {
      const user = _store.find(u => u.email === dto.email && u.password === dto.password);
      return user ? toSafe(user) : null;
    }
    try {
      return await apiClient.post<SafeCustomer>('/auth/login', dto, { signal });
    } catch {
      return null;
    }
  },

  /** Cambia la contraseña; devuelve false si la contraseña actual es incorrecta o el cliente no existe */
  async changeCustomerPassword(
    id: number,
    dto: ChangePasswordDto,
    signal?: AbortSignal
  ): Promise<boolean> {
    if (USE_MOCK) {
      const user = _store.find(u => u.id === id);
      if (!user || user.password !== dto.currentPassword) return false;
      user.password = dto.newPassword;
      return true;
    }
    try {
      await apiClient.post<void>(`/customers/${id}/change-password`, dto, { signal });
      return true;
    } catch {
      return false;
    }
  },

  /** Comprueba si un email ya está registrado — validación en tiempo real en el formulario */
  async checkEmailExists(email: string, signal?: AbortSignal): Promise<boolean> {
    if (USE_MOCK) return _store.some(u => u.email === email);
    try {
      await apiClient.get(`/auth/email-check?email=${encodeURIComponent(email)}`, { signal });
      return true;
    } catch {
      return false;
    }
  },

  // Utilidad para tests: reinicia el mock store
  _resetMockStore(): void {
    _store = [...mockUsers];
    _nextId = _store.length + 1;
  },
};
