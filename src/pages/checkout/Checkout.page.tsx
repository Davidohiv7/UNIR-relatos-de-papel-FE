import { useState } from 'react';
import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { useAuth, useShoppingCart, useAddressState, useAlert } from '../../hooks';
import { ROUTES } from '../../config/navigation/navigation.config';
import {
  CheckoutEmpty,
  CheckoutAddressPicker,
  CheckoutOrderSummary,
} from '../../components/checkout';

function CheckoutPage() {
  const { customer } = useAuth();
  const { cart, clearCart } = useShoppingCart();
  const { addresses, addAddress } = useAddressState(customer?.id ?? 0);
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    () => addresses[0]?.id ?? null
  );

  const isEmpty = Object.keys(cart).length === 0;

  if (isEmpty) return <CheckoutEmpty />;

  const handlePay = () => {
    if (!selectedAddressId) {
      showAlert('Selecciona una dirección de envío para continuar', 'warning');
      return;
    }
    clearCart();
    showAlert('¡Compra realizada con éxito! Tus libros están en camino 📚', 'success');
    navigate(ROUTES.catalog);
  };

  const handleGoToCatalog = () => navigate(ROUTES.catalog);

  const handleAddAddress = (address: Parameters<typeof addAddress>[0]) => {
    addAddress(address);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 0.5 }}>
        Casi listo 📚
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Elige dónde quieres recibir tus libros y confirma tu pedido.
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ alignItems: 'flex-start' }}>
        {/* Mobile: summary on top */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, width: '100%' }}>
          <CheckoutOrderSummary
            cart={cart}
            canPay={selectedAddressId !== null}
            onPay={handlePay}
            onGoToCatalog={handleGoToCatalog}
          />
        </Box>

        {/* Address picker — left on desktop, bottom on mobile */}
        <Box sx={{ flexGrow: 1, width: '100%' }}>
          <CheckoutAddressPicker
            addresses={addresses}
            selectedAddressId={selectedAddressId}
            onSelect={setSelectedAddressId}
            onAddAddress={handleAddAddress}
          />
        </Box>

        {/* Summary — right sticky on desktop, hidden on mobile */}
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            width: 360,
            flexShrink: 0,
            position: 'sticky',
            top: 80,
          }}
        >
          <CheckoutOrderSummary
            cart={cart}
            canPay={selectedAddressId !== null}
            onPay={handlePay}
            onGoToCatalog={handleGoToCatalog}
          />
        </Box>
      </Stack>
    </Container>
  );
}

export default CheckoutPage;
