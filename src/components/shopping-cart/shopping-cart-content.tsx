import { Box, Button, IconButton, Typography } from '@mui/material';

import { FC } from 'react';
import ShoppingCartList from './shopping-cart-list';
import { Close } from '@mui/icons-material';
import { useShoppingCart } from '../../hooks';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../config/navigation/navigation.config';

type Props = {
  onClose: () => void;
};

const ShoppingCartContent: FC<Props> = ({ onClose }) => {
  const { clearCart } = useShoppingCart();
  const navigate = useNavigate();
  const handleClearCart = () => {
    clearCart();
    onClose();
  };
  const handleGoToCheckout = () => {
    navigate(ROUTES.checkout);
    onClose();
  };
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Tu carrito</Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
      <Typography variant="body1" sx={{ mb: 2, whiteSpace: 'pre-wrap' }}>
        Estos son los libros que has seleccionado, da click en el botón de comprar para finalizar tu
        compra.
      </Typography>
      <ShoppingCartList />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          gap: { xs: 1, sm: 2 },
          mt: 2,
        }}
      >
        <Button variant="text" onClick={handleClearCart}>
          Eliminar todo
        </Button>
        <Button variant="contained" onClick={handleGoToCheckout}>
          Comprar
        </Button>
      </Box>
    </>
  );
};

export default ShoppingCartContent;
