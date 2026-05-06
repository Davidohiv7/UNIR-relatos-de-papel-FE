import { Box, Stack, Typography } from '@mui/material';
import { useAuth } from '../../hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../config/navigation/navigation.config';
import { LoginForm } from '../../components/login/LoginForm';
import BrandIcon from '../../components/ui/BrandIcon';

function LoginPage() {
  const { login, customer, isInitializing } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (customer && !isInitializing) {
      navigate(ROUTES.profile);
    }
  }, [customer, isInitializing, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        flexGrow: 1,
      }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 3 }}>
        <BrandIcon />
        <Typography
          variant="h4"
          sx={{
            mt: 0,
            mb: 3,
            color: 'primary.main',
            fontWeight: 700,
            display: { xs: 'none', sm: 'block' },
          }}
        >
          Relatos de Papel
        </Typography>
      </Stack>

      <LoginForm onLogin={login} />
    </Box>
  );
}

export default LoginPage;
