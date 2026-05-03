import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import { Link } from 'react-router';
import { BrandIcon } from '../../components/ui';
import { ROUTES, buildCatalogUrl } from '../../config/navigation/navigation.config';
import { BookFormat } from '../../types';

type FooterLink = {
  label: string;
  to: string;
  onClick?: () => void;
};

type ColumnProps = {
  title: string;
  links: FooterLink[];
  route: string;
};

function FooterColumn({ title, links, route }: ColumnProps) {
  return (
    <Stack spacing={1.5}>
      <Link to={route} style={{ textDecoration: 'none' }} onClick={links[0].onClick}>
        <Typography
          variant="overline"
          sx={{ fontWeight: 700, letterSpacing: 1.5, color: 'common.white' }}
        >
          {title}
        </Typography>
      </Link>
      {links.map(({ label, to, onClick }) => (
        <Link key={label} to={to} style={{ textDecoration: 'none' }} onClick={onClick}>
          <Typography
            variant="body2"
            sx={{
              color: 'common.white',
              opacity: 0.7,
              transition: 'opacity 0.15s',
              '&:hover': { opacity: 1 },
            }}
          >
            {label}
          </Typography>
        </Link>
      ))}
    </Stack>
  );
}

const handleCatalogLinkClick = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const catalogLinks: FooterLink[] = [
  { label: 'Todos los libros', to: ROUTES.catalog, onClick: handleCatalogLinkClick },
  {
    label: 'Libros físicos',
    to: buildCatalogUrl({ format: BookFormat.PHYSICAL }),
    onClick: handleCatalogLinkClick,
  },
  {
    label: 'Libros digitales',
    to: buildCatalogUrl({ format: BookFormat.DIGITAL }),
    onClick: handleCatalogLinkClick,
  },
  {
    label: 'Mejor valorados',
    to: buildCatalogUrl({ sortBy: 'rating', sortOrder: 'desc' }),
    onClick: handleCatalogLinkClick,
  },
  {
    label: 'Novedades',
    to: buildCatalogUrl({ sortBy: 'year', sortOrder: 'desc' }),
    onClick: handleCatalogLinkClick,
  },
];

const accountLinks: FooterLink[] = [
  { label: 'Iniciar sesión', to: ROUTES.login },
  { label: 'Mi perfil', to: ROUTES.profile },
  { label: 'Mi carrito', to: ROUTES.checkout },
];

const PAYMENT_METHODS = ['Visa', 'Mastercard', 'PayPal'];

function Footer() {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', mt: 'auto' }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '2fr 1fr 1fr' },
            gap: { xs: 3, md: 5 },
          }}
        >
          {/* Brand */}
          <Stack spacing={2}>
            <Link
              to={ROUTES.catalog}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <BrandIcon variant="secondary" />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Relatos de Papel
              </Typography>
            </Link>
            <Typography variant="body2" sx={{ opacity: 0.7, maxWidth: 320, lineHeight: 1.7 }}>
              Tu librería online de confianza. Descubre cientos de títulos físicos y digitales para
              todos los gustos y edades.
            </Typography>
          </Stack>

          <FooterColumn title="Catálogo" links={catalogLinks} route={ROUTES.catalog} />
          <FooterColumn title="Mi Cuenta" links={accountLinks} route={ROUTES.profile} />
        </Box>

        <Divider sx={{ my: { xs: 3, md: 4 }, borderColor: 'rgba(255,255,255,0.15)' }} />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
          }}
          spacing={2}
        >
          <Typography variant="body2" sx={{ opacity: 0.55 }}>
            © {new Date().getFullYear()} Relatos de Papel. Todos los derechos reservados.
          </Typography>
          <Stack direction="row" spacing={2} sx={{ opacity: 0.55 }}>
            {PAYMENT_METHODS.map(method => (
              <Typography key={method} variant="body2" sx={{ fontWeight: 600 }}>
                {method}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
