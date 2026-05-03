import { type FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ShoppingBagOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../config/navigation/navigation.config';

const CheckoutEmpty: FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        py: 10,
      }}
    >
      <ShoppingBagOutlined sx={{ fontSize: 64, color: 'text.disabled' }} />
      <Typography variant="h4" color="text.secondary">
        Tu carrito está vacío
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
        Agrega libros al carrito antes de proceder al pago.
      </Typography>
      <Button variant="contained" onClick={() => navigate(ROUTES.catalog)}>
        Ir al catálogo
      </Button>
    </Box>
  );
};

export default CheckoutEmpty;
