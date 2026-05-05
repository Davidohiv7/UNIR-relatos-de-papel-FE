import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';

import { SafeCustomer } from '../../../services';
import { useAlert } from '../../../hooks';

const profileSchema = z.object({
  firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  phone: z.string().min(7, 'Ingresa un número de teléfono válido'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

type Props = {
  customer: SafeCustomer;
};

const ProfileFormSection: FC<Props> = ({ customer }) => {
  const { showAlert } = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: 'onTouched',
    defaultValues: {
      firstName: customer.firstName,
      lastName: customer.lastName,
      phone: customer.phone,
    },
  });

  const onSubmit = (_: ProfileFormValues) => {
    showAlert('¡Perfil actualizado con éxito! ✨', 'success');
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Mi Perfil
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2}>
            <TextField
              {...register('firstName')}
              label="Nombre"
              error={!!errors.firstName}
              helperText={errors.firstName?.message ?? ' '}
              fullWidth
            />

            <TextField
              {...register('lastName')}
              label="Apellido"
              error={!!errors.lastName}
              helperText={errors.lastName?.message ?? ' '}
              fullWidth
            />

            <TextField
              {...register('phone')}
              label="Teléfono"
              error={!!errors.phone}
              helperText={errors.phone?.message ?? ' '}
              fullWidth
            />

            <Box sx={{ pt: 1 }}>
              <Button type="submit" variant="contained" color="primary" disabled={!isValid}>
                Guardar cambios
              </Button>
            </Box>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileFormSection;
