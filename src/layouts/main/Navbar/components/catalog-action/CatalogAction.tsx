import { IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../../../../config/navigation/navigation.config';

function CatalogAction() {
  const navigate = useNavigate();

  return (
    <IconButton
      aria-label="ir al catálogo"
      onClick={() => navigate(ROUTES.catalog)}
      sx={{ color: 'primary.main' }}
    >
      <Search />
    </IconButton>
  );
}

export default CatalogAction;
