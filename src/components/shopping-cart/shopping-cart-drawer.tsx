import { Box, Drawer } from '@mui/material';

import { FC } from 'react';
import ShoppingCartContent from './shopping-cart-content';
import { useShoppingCart } from '../../hooks';
import ShoppingCartEmpty from './shopping-cart-empty';

type Props = {
  open: boolean;
  onClose: () => void;
};

const ShoppingCartDrawer: FC<Props> = ({ open, onClose }) => {
  const { cart } = useShoppingCart();
  const isEmpty = Object.keys(cart).length === 0;
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: { xs: '100vw', sm: '520px', md: '640px' },
          minHeight: '100vh',
        }}
      >
        {isEmpty ? (
          <ShoppingCartEmpty onClose={onClose} />
        ) : (
          <ShoppingCartContent onClose={onClose} />
        )}
      </Box>
    </Drawer>
  );
};

export default ShoppingCartDrawer;
