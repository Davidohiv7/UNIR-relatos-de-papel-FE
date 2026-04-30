import { AppBar, Box, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { PersonOutlineOutlined, Search, ShoppingBagOutlined } from '@mui/icons-material';
import { Link } from 'react-router';
import { BrandIcon } from '../../components/ui';

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
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ alignItems: 'center', textDecoration: 'none', color: 'inherit' }}
          component={Link}
          to="/catalog"
        >
          <BrandIcon />
          <Typography variant="h4" sx={{ color: 'primary.main' }}>
            Relatos de Papel
          </Typography>
        </Stack>

        <Box>
          <IconButton aria-label="buscar" sx={{ color: 'primary.main' }}>
            <Search />
          </IconButton>
          <IconButton aria-label="perfil" sx={{ color: 'primary.main' }}>
            <PersonOutlineOutlined />
          </IconButton>
          <IconButton aria-label="carrito" sx={{ color: 'primary.main' }}>
            <ShoppingBagOutlined />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
