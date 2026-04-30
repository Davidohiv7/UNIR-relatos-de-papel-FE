import { Box, Container, Divider, Link, Stack, Typography, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { BrandIcon } from '../../components/ui';

type FooterLink = {
  label: string;
  to?: string;
};

const catalog: FooterLink[] = [{ label: 'Todos los libros', to: '/catalog' }];

const account: FooterLink[] = [
  { label: 'Iniciar Sesión', to: '/login' },

  { label: 'Mi Perfil', to: '/profile' },
];

const payments = ['Visa', 'Mastercard', 'PayPal'];

type ColumnProps = {
  title: string;
  items: FooterLink[];
};

function FooterColumn({ title, items }: ColumnProps) {
  return (
    <Stack spacing={1.5}>
      <Typography
        variant="overline"
        sx={{ fontWeight: 700, letterSpacing: 1.5, color: 'common.white' }}
      >
        {title}
      </Typography>
      {items.map(item =>
        item.to ? (
          <Link
            key={item.label}
            component={RouterLink}
            to={item.to}
            underline="hover"
            sx={{ color: 'common.white', opacity: 0.7, '&:hover': { opacity: 1 } }}
          >
            {item.label}
          </Link>
        ) : (
          <Link
            key={item.label}
            href="#"
            underline="hover"
            sx={{ color: 'common.white', opacity: 0.7, '&:hover': { opacity: 1 } }}
          >
            {item.label}
          </Link>
        )
      )}
    </Stack>
  );
}

function Footer() {
  const theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr 1fr' },
            gap: 4,
          }}
        >
          <Stack spacing={2}>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
              <BrandIcon variant="secondary" />
              <Typography variant="h5">Relatos de Papel</Typography>
            </Stack>
            <Typography variant="body2" sx={{ opacity: 0.7, maxWidth: 340 }}>
              Tu librería online de confianza. Más de 248 títulos para todos los gustos.
            </Typography>
          </Stack>

          <FooterColumn title="Catálogo" items={catalog} />
          <FooterColumn title="Mi Cuenta" items={account} />
        </Box>

        <Divider sx={{ my: 4, borderColor: theme.palette.primary[300] }} />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
          spacing={2}
        >
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            © {new Date().getFullYear()} Relatos de Papel. Todos los derechos reservados.
          </Typography>
          <Stack direction="row" spacing={3} sx={{ opacity: 0.6 }}>
            {payments.map(p => (
              <Typography key={p} variant="body2">
                {p}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
