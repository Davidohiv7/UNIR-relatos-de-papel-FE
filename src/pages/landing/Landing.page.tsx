import * as React from 'react';
import { Link as RouterLink } from 'react-router';
import Grid from '@mui/material/Grid';
import { Box, Container, Typography, Button, Chip, Stack } from '@mui/material';
import { LANDING_BENEFITS, LANDING_CATEGORIES } from '../../constants/landing.constants';

const LandingPage: React.FC = () => {
  const HERO_IMAGE = 'https://i.ibb.co/v4w6wmsv/Chat-GPT-Image-5-may-2026-22-30-33.png';

  return (
    <Box>
      {/* HERO */}
      <Box
        sx={{
          position: 'relative',
          minHeight: 580,
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'primary.main',
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
            background:
              'linear-gradient(to right, rgba(26,26,46,1), rgba(26,26,46,0.8), transparent)',
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
                variant="h1"
                sx={{
                  color: 'white',
                  fontFamily: 'Caveat, cursive',
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '2.5rem', sm: '3.5rem' },
                }}
              >
                Tu próxima gran{' '}
                <Typography
                  component="span"
                  sx={{
                    color: 'secondary.main',
                    fontSize: 'inherit',
                    fontWeight: 'inherit',
                    fontFamily: 'inherit',
                  }}
                >
                  aventura literaria
                </Typography>{' '}
                comienza aquí
              </Typography>

              <Typography sx={{ color: 'rgba(255,255,255,0.7)', mb: 4 }}>
                Encuentra miles de libros físicos y digitales, desde clásicos atemporales hasta los
                bestsellers más populares del momento.
              </Typography>

              {/* TAGS */}
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                {LANDING_CATEGORIES.map(category => (
                  <Chip
                    key={category.to}
                    label={category.label}
                    clickable
                    component={RouterLink}
                    to={category.to}
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                    }}
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* BENEFITS */}
      <Box sx={{ bgcolor: 'common.white', py: { xs: 4, sm: 6 } }}>
        <Container>
          <Grid container rowSpacing={3} sx={{ px: { xs: 2, sm: 0 } }}>
            {LANDING_BENEFITS.map(({ icon: Icon, title, desc, color, iconColor }) => (
              <Grid key={title} size={{ xs: 12, sm: 4 }}>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ width: '100%', justifyContent: { xs: 'flex-start', sm: 'center' } }}
                >
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

        {/* PROMO */}
        <Container sx={{ my: 6 }}>
          <Box
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              background: 'linear-gradient(to right, rgba(26,26,46,1), rgba(45,45,78,1))',
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
                Sumérgete en clásicos inolvidables, las novedades más esperadas y los bestsellers
                del momento, todo desde la comodidad de tu
                <b style={{ color: '#f0a070' }}> hogar</b>
              </Typography>
            </Box>

            <Button
              component={RouterLink}
              to="/catalog"
              variant="contained"
              color="secondary"
              size="large"
            >
              Explorar Catálogo →
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
