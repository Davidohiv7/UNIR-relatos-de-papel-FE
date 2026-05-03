import { useContext } from 'react';
import { ShoppingCartContext } from '../../context/shopping-cart/shopping-cart.context';

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext);
  if (!context) throw new Error('useShoppingCart must be used within ShoppingCartProvider');
  return context;
}
