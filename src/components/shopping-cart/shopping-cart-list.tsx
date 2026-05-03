import { FC } from 'react';
import { useShoppingCart } from '../../hooks';
import { ShoppingCartItem } from './shopping-cart-item';
import { Stack } from '@mui/material';

const ShoppingCartList: FC = () => {
  const { cart } = useShoppingCart();

  return (
    <Stack spacing={1} direction="column">
      {Object.values(cart).map(item => (
        <ShoppingCartItem key={item.book.id} item={item} />
      ))}
    </Stack>
  );
};

export default ShoppingCartList;
