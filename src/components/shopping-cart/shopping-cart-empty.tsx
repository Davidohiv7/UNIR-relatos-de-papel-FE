import { Box, Button, Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../config/navigation/navigation.config';
import { SearchOutlined } from '@mui/icons-material';

type Props = {
  onClose: () => void;
};

const ShoppingCartEmpty: FC<Props> = ({ onClose }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        height: '100%',
        mt: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <Typography variant="h4">Tu carrito está vacío</Typography>
      <Typography variant="body1">Agrega algunos libros para continuar</Typography>
      <Button
        variant="contained"
        onClick={() => {
          onClose();
          navigate(ROUTES.catalog);
        }}
        startIcon={<SearchOutlined />}
      >
        Encontrar libros
      </Button>
    </Box>
  );
};

export default ShoppingCartEmpty;
