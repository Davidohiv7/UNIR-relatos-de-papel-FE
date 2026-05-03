import { createContext } from 'react';
import type { Cart } from '../../types/cart.types';
import type { Book } from '../../types/book.types';

export type ShoppingCartContextValue = {
  cart: Cart;
  addItem: (book: Book, quantity?: number) => void;
  removeItem: (bookId: number) => void;
  updateQuantity: (bookId: number, quantity: number) => void;
  clearCart: () => void;
};

export const ShoppingCartContext = createContext<ShoppingCartContextValue | null>(null);
