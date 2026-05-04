import { AppBar, Box, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router';
import { BrandIcon } from '../../../components/ui';
import { ROUTES } from '../../../config/navigation/navigation.config';
import CatalogAction from './components/catalog-action';
import AuthAction from './components/auth-action';
import ShoppingCartAction from './components/shopping-cart-action';

function Navbar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: 56, sm: 64 } }}>
        <Tooltip title="Ir al catálogo" placement="bottom">
          <Link to={ROUTES.catalog} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <BrandIcon />
              <Typography
                variant="h5"
                sx={{
                  color: 'primary.main',
                  fontWeight: 700,
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                Relatos de Papel
              </Typography>
            </Stack>
          </Link>
        </Tooltip>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <CatalogAction />
          <AuthAction />
          <ShoppingCartAction />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
