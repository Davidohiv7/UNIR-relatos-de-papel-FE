import { Box, Button, Typography, Card, CardContent } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import Mail from '@mui/icons-material/Mail';
import { useState } from 'react';
import { LoginEmailForm } from './LoginEmailForm'; // IMPORTANTE: Importar el nuevo
import { KeyboardBackspace } from '@mui/icons-material';
import { Link } from 'react-router';
import { ROUTES } from '../../config/navigation/navigation.config';

interface LoginFormProps {
  onLogin: (email: string, pass: string) => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  // hook de estado para controlar la vista del formulario de corre

  const [showEmailForm, setShowEmailForm] = useState(false);

  return (
    <>
      <Card
        sx={{
          width: { xs: '90%', sm: 400 },
          borderRadius: 4,
          boxShadow: 2,
        }}
      >
        <CardContent sx={{ textAlign: 'center', p: 4 }}>
          {/* Lógica condicional */}
          {!showEmailForm ? (
            <>
              {' '}
              {/*Fragment*/}
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                Iniciar sesión
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Elija su método de inicio de sesión
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Mail />}
                  onClick={() => setShowEmailForm(true)}
                  sx={{
                    py: 1.5,
                    px: 3,
                    borderRadius: 2,
                    color: '#1a1c2c',
                    borderColor: '#e0e0e0',
                    justifyContent: 'flex-start',
                  }}
                >
                  <Typography
                    sx={{
                      flexGrow: 1,
                      textAlign: 'center',
                      mr: 4,
                      fontWeight: 500,
                      fontStyle: 'italic',
                    }}
                  >
                    Correo electrónico
                  </Typography>
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<GoogleIcon sx={{ color: '#db4437' }} />}
                  onClick={() => onLogin('ana@relatos.com', 'password123')}
                  sx={{
                    py: 1.5,
                    px: 3,
                    borderRadius: 2,
                    color: '#1a1c2c',
                    borderColor: '#e0e0e0',
                    justifyContent: 'flex-start',
                  }}
                >
                  <Typography
                    sx={{
                      flexGrow: 1,
                      textAlign: 'left',
                      ml: 7,
                      fontWeight: 500,
                      fontStyle: 'italic',
                    }}
                  >
                    Cuenta Google
                  </Typography>
                </Button>
                <Button
                  variant="text"
                  component={Link}
                  to={ROUTES.catalog}
                  startIcon={<KeyboardBackspace />}
                >
                  Volver a al catalogo
                </Button>
              </Box>
            </>
          ) : (
            /*  Vista hacia el formulario de correo */
            <LoginEmailForm onLogin={onLogin} onBack={() => setShowEmailForm(false)} />
          )}
        </CardContent>
      </Card>
      <Box
        sx={{
          mt: 3, // Espacio entre la tarjeta y el banner
          bgcolor: 'common.white',
          p: 1.5,
          borderRadius: 4,
          textAlign: 'center',
          width: { xs: '90%', sm: 400 },
        }}
      >
        <Typography variant="body2" sx={{ color: 'secondary.700' }}>
          Demo: usa <strong>ana@relatos.com</strong> / <strong>password123</strong>
        </Typography>
      </Box>
    </>
  );
};
