import type { Cart } from '../types/cart.types';

const CART_STORAGE_KEY = 'relatos-de-papel.cart';

const safeStorage = (): Storage | null => {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

const readStoredCart = (): Cart | null => {
  const storage = safeStorage();
  if (!storage) return null;

  try {
    const raw = storage.getItem(CART_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Cart) : null;
  } catch {
    return null;
  }
};

const writeStoredCart = (cart: Cart): void => {
  const storage = safeStorage();
  if (!storage) return;

  try {
    storage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch {}
};

const clearStoredCart = (): void => {
  const storage = safeStorage();
  storage?.removeItem(CART_STORAGE_KEY);
};

export { readStoredCart, writeStoredCart, clearStoredCart };
