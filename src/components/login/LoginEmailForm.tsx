import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  OutlinedInput,
} from '@mui/material';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { KeyboardBackspace } from '@mui/icons-material';
import { Snackbar, Alert } from '@mui/material';

interface LoginEmailFormProps {
  onLogin: (email: string, pass: string) => void;
  onBack: () => void;
}

export const LoginEmailForm = ({ onLogin, onBack }: LoginEmailFormProps) => {
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e: React.SubmitEvent) => {
    //cumple el papel de mensajero entre el formulario y el componente LoginForm
    e.preventDefault(); //Espera y No recarga la página
    if (!emailRegex.test(email)) {
      setErrorMessage('Por favor, ingresa un correo electrónico válido.');
      setOpenError(true);
      return;
    }

    // Ejemplo de validación local simple antes de enviar
    if (email !== 'ana@relatos.com' || password !== 'password123') {
      setErrorMessage('Credenciales incorrectas. Revisa tu usuario o contraseña.');
      setOpenError(true);
      return; // Detiene el login
    }
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
          error={email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
          helperText={
            email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Formato inválido' : ''
          }
          sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
        />

        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'left' }}>
          Contraseña
        </Typography>

        {/*Input para la contraseña, controlado por el estado 'password' y con funcionalidad de mostrar/ocultar contraseña*/}

        <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
          {/* <InputLabel htmlFor="password-input">Contraseña</InputLabel> */}
          <OutlinedInput
            id="password-input"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
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

        <Button variant="text" onClick={onBack} startIcon={<KeyboardBackspace />}>
          Volver a opciones
        </Button>
        <Snackbar
          open={openError}
          autoHideDuration={4000}
          onClose={() => setOpenError(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Aparece arriba al centro
        >
          <Alert
            onClose={() => setOpenError(false)}
            severity="error"
            variant="filled"
            sx={{ width: '100%', borderRadius: 2 }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};
