import { useState, useCallback, useEffect } from 'react';
import { Cart } from '../../types/cart.types';
import { clearStoredCart, readStoredCart, writeStoredCart } from '../../utils/shopping-cart.utils';
import { Book } from '../../types';

export function useShoppingCartState() {
  const [cart, setCart] = useState<Cart>(() => readStoredCart() ?? {});

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'relatos-de-papel.cart') {
        setCart(readStoredCart() ?? {});
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addItem = useCallback((book: Book, quantity: number = 1) => {
    setCart(prev => {
      const existingItem = prev[book.id];
      const newCart: Cart = {
        ...prev,
        [book.id]: {
          book,
          quantity: existingItem ? existingItem.quantity + quantity : quantity,
        },
      };
      writeStoredCart(newCart);
      return newCart;
    });
  }, []);

  const removeItem = useCallback((bookId: number) => {
    setCart(prev => {
      if (!prev[bookId]) return prev;
      const newCart = { ...prev };
      delete newCart[bookId];
      writeStoredCart(newCart);
      return newCart;
    });
  }, []);

  const updateQuantity = useCallback((bookId: number, quantity: number) => {
    setCart(prev => {
      if (!prev[bookId]) return prev;

      if (quantity <= 0) {
        const newCart = { ...prev };
        delete newCart[bookId];
        writeStoredCart(newCart);
        return newCart;
      }

      const newCart: Cart = {
        ...prev,
        [bookId]: { ...prev[bookId], quantity },
      };
      writeStoredCart(newCart);
      return newCart;
    });
  }, []);

  const clearCart = useCallback(() => {
    clearStoredCart();
    setCart({});
  }, []);

  return { cart, addItem, removeItem, updateQuantity, clearCart };
}
