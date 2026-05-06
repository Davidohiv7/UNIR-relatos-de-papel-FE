import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface LoginEmailFormProps {
  onLogin: (email: string, pass: string) => void;
  onBack: () => void;
}

export const LoginEmailForm = ({ onLogin, onBack }: LoginEmailFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.SubmitEvent) => {
    //cumple el papel de mensajero entre el formulario y el componente LoginForm
    e.preventDefault(); //Espera y No recarga la página
    onLogin(email, password);
  };

  return (
    <>
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
          fullWidth
          variant="outlined"
          placeholder="usuario@relatos.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
        />

        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'left' }}>
          Contraseña
        </Typography>

        {/*Input para la contraseña, controlado por el estado 'password' y con funcionalidad de mostrar/ocultar contraseña*/}

        <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
          <InputLabel htmlFor="password-input">Contraseña</InputLabel>
          <OutlinedInput
            id="password-input"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            label="Contraseña"
            endAdornment={
              //Icono para mostrar u ocultar la contraseña
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            sx={{ borderRadius: 3 }}
          />
        </FormControl>

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
        >
          Iniciar sesión
        </Button>

        <Typography
          variant="body2"
          onClick={onBack}
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            cursor: 'pointer',
            textDecoration: 'underline',
            mb: 0,
          }}
        >
          Volver a opciones
        </Typography>
      </Box>
    </>
  );
};
