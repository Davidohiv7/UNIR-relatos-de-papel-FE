import { type FC, type ReactNode, useMemo } from 'react';
import { ShoppingCartContext } from './shopping-cart.context';
import { useShoppingCartState } from '../../hooks';

type ShoppingCartProviderProps = {
  children: ReactNode;
};

export const ShoppingCartProvider: FC<ShoppingCartProviderProps> = ({ children }) => {
  const { cart, addItem, removeItem, updateQuantity, clearCart } = useShoppingCartState();

  const value = useMemo(
    () => ({
      cart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [cart, addItem, removeItem, updateQuantity, clearCart]
  );

  return <ShoppingCartContext.Provider value={value}>{children}</ShoppingCartContext.Provider>;
};
