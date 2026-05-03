import { AppBar, Box, Stack, Toolbar, Typography } from '@mui/material';
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
        py: { xs: 1, sm: 0 },
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Link to={ROUTES.catalog} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <BrandIcon />
            <Typography variant="h4" sx={{ color: 'primary.main' }}>
              Relatos de Papel
            </Typography>
          </Stack>
        </Link>

        <Box>
          <CatalogAction />
          <AuthAction />
          <ShoppingCartAction />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
