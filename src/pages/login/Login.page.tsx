// TODO: Implementar formulario de login con Material UI, hice esto solo para no bloquearme
import { Box, Button, Typography } from '@mui/material';
import { useAuth } from '../../hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../config/navigation/navigation.config';

function LoginPage() {
  const { login, customer, isInitializing } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (customer && !isInitializing) {
      navigate(ROUTES.catalog);
    }
  }, [customer, isInitializing, navigate]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignSelf: 'stretch', flexGrow: 1 }}>
      <Typography variant="h2">Login</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="body1">Email: ana@relatos.com</Typography>
          <Typography variant="body1">Password: password123</Typography>
          <Button variant="contained" onClick={() => login('ana@relatos.com', 'password123')}>
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;
