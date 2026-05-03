import { Stack, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { FC } from 'react';

interface QuantityInputProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  maxQuantity: number;
}

export const QuantityInput: FC<QuantityInputProps> = ({
  quantity,
  onQuantityChange,
  maxQuantity,
}) => {
  return (
    <Stack
      direction="row"
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        alignItems: 'center',
      }}
    >
      <IconButton
        size="small"
        onClick={() => onQuantityChange(quantity - 1)}
        disabled={quantity <= 1}
        sx={{ borderRadius: 0 }}
      >
        <RemoveIcon fontSize="small" />
      </IconButton>
      <Typography variant="body2" sx={{ minWidth: 28, textAlign: 'center', fontWeight: 500 }}>
        {quantity}
      </Typography>
      <IconButton
        size="small"
        onClick={() => onQuantityChange(quantity + 1)}
        disabled={quantity >= maxQuantity}
        sx={{ borderRadius: 0 }}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
};
