import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Stack, TextField, Button } from '@mui/material';
import { AddressInput } from '../../types/address.types';

const addressSchema = z.object({
  line1: z.string().min(3, 'La dirección principal es requerida y debe ser válida'),
  line2: z.string().optional(),
  city: z.string().min(2, 'La ciudad es requerida'),
});

type Props = {
  onSubmit: (address: AddressInput) => void;
  onCancel?: () => void;
};

const AddressForm: FC<Props> = ({ onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AddressInput>({
    resolver: zodResolver(addressSchema),
    mode: 'onTouched',
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ py: 2 }}>
      <Stack spacing={1}>
        <TextField
          {...register('line1')}
          label="Dirección (Línea 1)"
          placeholder="Ej: Calle Libertad 123"
          error={!!errors.line1}
          helperText={errors.line1?.message ?? ' '}
          fullWidth
        />

        <TextField
          {...register('line2')}
          label="Dirección (Línea 2) - Opcional"
          placeholder="Ej: Piso 4B, Edificio Los Pinos"
          error={!!errors.line2}
          helperText={errors.line2?.message ?? ' '}
          fullWidth
        />

        <TextField
          {...register('city')}
          label="Ciudad"
          placeholder="Ej: Madrid"
          error={!!errors.city}
          helperText={errors.city?.message ?? ' '}
          fullWidth
        />

        <Stack direction="row" spacing={2} sx={{ pt: 2, justifyContent: 'flex-end' }}>
          {onCancel && (
            <Button variant="text" color="inherit" onClick={onCancel}>
              Cancelar
            </Button>
          )}
          <Button variant="contained" color="primary" type="submit" disabled={!isValid}>
            Guardar Dirección
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AddressForm;
