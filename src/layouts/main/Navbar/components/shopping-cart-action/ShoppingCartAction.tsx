import { useState } from 'react';
import { IconButton } from '@mui/material';
import { ShoppingBagOutlined } from '@mui/icons-material';
import { ShoppingCartDrawer } from '../../../../../components/shopping-cart';

function ShoppingCartAction() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <IconButton aria-label="carrito" onClick={open} sx={{ color: 'primary.main' }}>
        <ShoppingBagOutlined />
      </IconButton>
      <ShoppingCartDrawer open={isOpen} onClose={close} />
    </>
  );
}

export default ShoppingCartAction;
