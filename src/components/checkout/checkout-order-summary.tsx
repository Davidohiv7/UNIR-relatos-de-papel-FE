import { type FC } from 'react';
import { Box, Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import type { Cart } from '../../types/cart.types';
import BookImage from '../book/book-image';
import { formatPrice } from '../../utils/price.utils';

type Props = {
  cart: Cart;
  canPay: boolean;
  onPay: () => void;
  onGoToCatalog: () => void;
};

const CheckoutOrderSummary: FC<Props> = ({ cart, canPay, onPay, onGoToCatalog }) => {
  const items = Object.values(cart);
  const total = items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Resumen de la Orden
        </Typography>

        <Stack spacing={2}>
          {items.map(item => (
            <Box key={item.book.id} sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
              <BookImage src={item.book.pictures[0]?.url ?? ''} alt={item.book.title} size={48} />
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }} noWrap>
                  {item.book.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                  {item.book.author}
                </Typography>
                {item.quantity > 1 && (
                  <Typography variant="caption" color="text.secondary">
                    Cantidad: {item.quantity}
                  </Typography>
                )}
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, flexShrink: 0 }}>
                {formatPrice(item.book.price * item.quantity)}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Total
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {formatPrice(total)}
          </Typography>
        </Box>

        <Stack spacing={1}>
          <Button variant="contained" fullWidth size="large" disabled={!canPay} onClick={onPay}>
            Confirmar y pagar
          </Button>
          <Button variant="text" fullWidth onClick={onGoToCatalog}>
            Seguir explorando libros
          </Button>
        </Stack>

        {!canPay && (
          <Typography
            variant="caption"
            color="warning.main"
            sx={{ mt: 1.5, display: 'block', textAlign: 'center' }}
          >
            Selecciona una dirección de envío para continuar
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default CheckoutOrderSummary;
