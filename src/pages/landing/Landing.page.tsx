import { Link as RouterLink } from 'react-router';
import Grid from '@mui/material/Grid';
import { Box, Container, Typography, Button, Chip, Stack } from '@mui/material';
import { FireTruck, Refresh, Shield } from '@mui/icons-material';

const LandingPage: React.FC = () => {
  const HERO_IMAGE = 'https://i.ibb.co/v4W6wmsv/Chat-GPT-Image-5-may-2026-22-30-33.png';

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#faf8f5' }}>
      {/* HERO */}
      <Box
        sx={{
          position: 'relative',
          minHeight: 580,
          display: 'flex',
          alignItems: 'center',
          bgcolor: '#1a1a2e',
          overflow: 'hidden',
        }}
      >
        {/* Background */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.2,
            backgroundImage: `url(${HERO_IMAGE})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, #1a1a2e, rgba(26,26,46,0.9), transparent)',
          }}
        />

        <Container sx={{ position: 'relative', py: 8 }}>
          <Grid container spacing={6} sx={{ alignItems: 'center' }}>
            <Grid>
              <Chip
                label="+248 libros disponibles"
                sx={{
                  mb: 3,
                  bgcolor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  backdropFilter: 'blur(6px)',
                }}
              />

              <Typography
                variant="h2"
                sx={{
                  color: 'white',
                  fontFamily: 'Caveat, cursive',
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Tu próxima gran <br />
                <Box component="span" sx={{ color: '#f0a070' }}>
                  aventura literaria
                </Box>
                <br />
                comienza aquí
              </Typography>

              <Typography sx={{ color: 'rgba(255,255,255,0.7)', mb: 4 }}>
                Explora miles de libros físicos y digitales, desde clásicos inolvidables hasta los
                bestsellers
              </Typography>

              {/* TAGS */}
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                <Chip
                  label="Fantasía"
                  clickable
                  component={RouterLink}
                  to="/catalog?cat=7"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                  }}
                />

                <Chip
                  label="Ciencia ficción"
                  clickable
                  component={RouterLink}
                  to="/catalog?cat=4"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                  }}
                />

                <Chip
                  label="Autoayuda"
                  clickable
                  component={RouterLink}
                  to="/catalog?cat=14"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                  }}
                />

                <Chip
                  label="Aventuras"
                  clickable
                  component={RouterLink}
                  to="/catalog?cat=6"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                  }}
                />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* PROMO */}
      <Container sx={{ my: 6 }}>
        <Box
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            background: 'linear-gradient(to right, #1a1a2e, #2d2d4e)',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Box>
            <Typography sx={{ color: '#f0a070', mb: 1 }}>INSPÍRATE HOY</Typography>

            <Typography
              variant="h4"
              sx={{
                color: 'white',
                fontFamily: 'Caveat, cursive',
                fontWeight: 700,
              }}
            >
              Descubre mundos nuevos en cada página
            </Typography>

            <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Explora clásicos inolvidables, novedades y bestsellers desde la comodidad de tu
              <Box component="span" sx={{ color: '#f0a070', fontWeight: 'bold', ml: 0.5 }}>
                hogar
              </Box>
            </Typography>
          </Box>

          <Button
            component={RouterLink}
            to="/catalog"
            variant="contained"
            sx={{
              bgcolor: '#c8956c',
              px: 4,
              py: 2,
              borderRadius: 3,
              '&:hover': { bgcolor: '#d4a070' },
            }}
          >
            Explorar Catálogo →
          </Button>
        </Box>
      </Container>

      {/* BENEFITS */}
      <Box sx={{ bgcolor: 'white', py: 6 }}>
        <Container>
          <Grid container spacing={4}>
            {[
              {
                icon: FireTruck,
                title: 'Envío rápido y seguro',
                desc: 'Recibe tu pedido en 24-48h...',
                color: '#e3f2fd',
                iconColor: '#1976d2',
              },
              {
                icon: Refresh,
                title: 'Devoluciones fáciles',
                desc: '30 días para devolver...',
                color: '#e8f5e9',
                iconColor: '#2e7d32',
              },
              {
                icon: Shield,
                title: 'Pago 100% seguro',
                desc: 'Tus datos están protegidos...',
                color: '#f3e5f5',
                iconColor: '#6a1b9a',
              },
            ].map(({ icon: Icon, title, desc, color, iconColor }) => (
              <Grid sx={{ display: 'flex', alignItems: 'center', gap: 2 }} key={title}>
                <Stack direction="row" spacing={2}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon sx={{ color: iconColor }} />
                  </Box>

                  <Box>
                    <Typography sx={{ fontWeight: 600, mb: 0.5 }}>{title}</Typography>

                    <Typography variant="body2" color="text.secondary">
                      {desc}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
