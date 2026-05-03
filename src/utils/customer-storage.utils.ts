import type { SafeCustomer } from '../services';

const CUSTOMER_STORAGE_KEY = 'relatos-de-papel.customer';

const safeStorage = (): Storage | null => {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

const readStoredCustomer = (): SafeCustomer | null => {
  const storage = safeStorage();
  if (!storage) return null;

  try {
    const raw = storage.getItem(CUSTOMER_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SafeCustomer) : null;
  } catch {
    return null;
  }
};

const writeStoredCustomer = (customer: SafeCustomer): void => {
  const storage = safeStorage();
  if (!storage) return;

  try {
    storage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customer));
  } catch {
    // ignorado: cuota excedida o storage bloqueado
  }
};

const clearStoredCustomer = (): void => {
  const storage = safeStorage();
  storage?.removeItem(CUSTOMER_STORAGE_KEY);
};

export { readStoredCustomer, writeStoredCustomer, clearStoredCustomer };
