import { Button } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useAuth } from '../../hooks';
import { ROUTES } from '../../config/navigation/navigation.config';

function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Button
      onClick={() => logout(ROUTES.catalog)}
      variant="outlined"
      color="error"
      startIcon={<Logout />}
      fullWidth
      size="large"
    >
      Cerrar sesión
    </Button>
  );
}

export default LogoutButton;
