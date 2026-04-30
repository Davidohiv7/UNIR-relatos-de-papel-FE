import { Box, Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
      }}
    >
      <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center' }}>
        <Typography variant="h1" color="primary.main">
          404
        </Typography>
        <Typography variant="h5">Esta página se perdió entre los estantes</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 420 }}>
          La ruta que buscas no existe o fue movida. Vuelve al inicio para seguir explorando.
        </Typography>
        <Button component={Link} to="/" variant="contained" color="secondary" size="large">
          Volver al inicio
        </Button>
      </Stack>
    </Box>
  );
}

export default NotFoundPage;
