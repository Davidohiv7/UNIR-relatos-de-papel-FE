import { Box, Divider, Menu, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../../../hooks';
import { ROUTES } from '../../../../../config/navigation/navigation.config';

type Props = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
};

function AuthActionsList({ anchorEl, open, onClose }: Props) {
  const { customer, logout } = useAuth();
  const navigate = useNavigate();

  const goToProfile = () => {
    onClose();
    navigate(ROUTES.profile);
  };

  const handleLogout = () => {
    onClose();
    logout();
  };

  if (!customer) {
    return (
      <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
        <MenuItem onClick={goToProfile}>Iniciar sesión</MenuItem>
      </Menu>
    );
  }

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <Box sx={{ px: 2, py: 1.5, minWidth: 220 }}>
        <Typography variant="subtitle1">¡Hola, {customer.firstName}!</Typography>
      </Box>
      <Divider />
      <MenuItem onClick={goToProfile}>Ir a tu perfil</MenuItem>
      <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
    </Menu>
  );
}

export default AuthActionsList;
