import { Box, Button, Typography, Card, CardContent } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import Mail from '@mui/icons-material/Mail';
import { useState } from 'react';
import { LoginEmailForm } from './LoginEmailForm'; // IMPORTANTE: Importar el nuevo

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
          width: '100%',
          maxWidth: 400,
          borderRadius: 4,
          boxShadow: '0px 4px 20px rgba(0,0,0,0.08)',
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
                  onClick={() => setShowEmailForm(true)} // CAMBIA: Ahora solo abre el form
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
                  onClick={() => onLogin('ana@relatos.com', 'password123')} // Google se queda igual por ahora
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
          bgcolor: '#fff9e6',
          p: 1.5,
          borderRadius: 4,
          border: '1px solid #ffeeba',
          textAlign: 'center',
          width: '100%',
          maxWidth: 400, // Para que tenga el mismo ancho que la tarjeta
          visibility: !showEmailForm ? 'hidden' : 'visible',
        }}
      >
        <Typography variant="body2" sx={{ color: '#856404' }}>
          Demo: usa <strong>ana@relatos.com</strong> / <strong>password123</strong>
        </Typography>
      </Box>
    </>
  );
};
