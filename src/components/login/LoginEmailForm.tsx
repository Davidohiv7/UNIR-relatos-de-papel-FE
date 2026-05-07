import { Box, Button, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { KeyboardBackspace } from '@mui/icons-material';
import { useAlert, useAuth } from '../../hooks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

const addressSchema = z.object({
  email: z.email('Agrega un email valido').trim(),
  password: z.string().trim().min(1, 'Agrega la contraseña'),
});
interface LoginEmailFormProps {
  onBack: () => void;
}

export const LoginEmailForm = ({ onBack }: LoginEmailFormProps) => {
  const { login } = useAuth();
  const { showAlert } = useAlert();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors, isValid },
  } = useForm<{
    email: string;
    password: string;
  }>({
    resolver: zodResolver(addressSchema),
    mode: 'onTouched',
  });

  const handleSubmit = handleFormSubmit(async values => {
    try {
      await login(values);
    } catch {
      showAlert('Credenciales incorrectas. Revisa tu usuario o contraseña.', 'error');
    }
  });

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 0, mb: 0 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center', fontStyle: 'italic' }}
      >
        Iniciar sesión con correo
      </Typography>

      <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'left' }}>
        Usuario/Correo Electrónico
      </Typography>

      {/*Input para el correo electrónico, controlado por el estado 'email'*/}
      <TextField
        {...register('email')}
        variant="outlined"
        placeholder="usuario@relatos.com"
        error={!!errors.email}
        helperText={errors.email?.message ?? ' '}
        sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
        fullWidth
      />

      <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'left' }}>
        Contraseña
      </Typography>

      {/*Input para la contraseña, controlado por el estado 'password' y con funcionalidad de mostrar/ocultar contraseña*/}

      <TextField
        {...register('password')}
        variant="outlined"
        type={showPassword ? 'text' : 'password'}
        placeholder="••••••••"
        error={!!errors.password}
        helperText={errors.password?.message ?? ' '}
        sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
        fullWidth
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          bgcolor: '#1a1c2c',
          py: 1.5,
          borderRadius: 3,
          textTransform: 'none',
          fontWeight: 'bold',
          mb: 2,
        }}
        disabled={!isValid}
      >
        Iniciar sesión
      </Button>

      <Button variant="text" onClick={onBack} startIcon={<KeyboardBackspace />}>
        Volver a opciones
      </Button>
    </Box>
  );
};
