import { useState } from 'react';
import { Badge, IconButton, Tooltip } from '@mui/material';
import { ShoppingBagOutlined } from '@mui/icons-material';
import { ShoppingCartDrawer } from '../../../../../components/shopping-cart';
import { useShoppingCart } from '../../../../../hooks';

function ShoppingCartAction() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useShoppingCart();

  const itemCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Tooltip title="Carrito de compras">
        <IconButton
          aria-label="carrito"
          onClick={() => setIsOpen(true)}
          sx={{ color: 'primary.main' }}
        >
          <Badge badgeContent={itemCount > 0 ? itemCount : undefined} color="error" max={99}>
            <ShoppingBagOutlined />
          </Badge>
        </IconButton>
      </Tooltip>
      <ShoppingCartDrawer open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default ShoppingCartAction;
