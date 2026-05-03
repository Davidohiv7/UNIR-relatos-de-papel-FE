import { FC } from 'react';
import { Box, Typography, IconButton, Card } from '@mui/material';
import { CartItem } from '../../types/cart.types';
import { useShoppingCart } from '../../hooks';
import { DeleteOutlineOutlined } from '@mui/icons-material';
import BookImage from '../book/book-image';
import { QuantityInput } from '../inputs/quantity-input';

type ShoppingCartItemProps = {
  item: CartItem;
};

export const ShoppingCartItem: FC<ShoppingCartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useShoppingCart();

  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <BookImage src={item.book.pictures?.[0]?.url} alt={item.book.title} size={64} />
        <Box sx={{ flexGrow: 1, flexDirection: 'column', display: 'flex' }}>
          <ShopCartItemBookDescription item={item} onRemove={() => removeItem(item.book.id)} />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              mt: 'auto',
            }}
          >
            <Typography variant="subtitle1" sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
              ${(item.book.price * item.quantity).toFixed(2)}
            </Typography>

            <QuantityInput
              quantity={item.quantity}
              onQuantityChange={quantity => updateQuantity(item.book.id, quantity)}
              maxQuantity={item.book.stock}
            />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

const ShopCartItemBookDescription: FC<{ item: CartItem; onRemove: () => void }> = ({
  item,
  onRemove,
}) => {
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, lineHeight: 1.2, mb: 0.5 }}>
            {item.book.title}
          </Typography>
          <Typography variant="caption" sx={{ mb: 1, color: 'text.secondary', display: 'block' }}>
            {item.book.author}
          </Typography>
        </Box>
        <IconButton size="small" color="error" onClick={onRemove} sx={{ mt: -1, mr: -1 }}>
          <DeleteOutlineOutlined fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};
