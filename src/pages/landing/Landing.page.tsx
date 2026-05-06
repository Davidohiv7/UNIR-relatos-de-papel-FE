import * as React from 'react';
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router';
import Grid from '@mui/material/Grid';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Chip,
  Stack,
  Paper,
  useTheme,
  alpha,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { LANDING_BENEFITS, LANDING_CATEGORIES } from '../../constants/landing.constants';
import { ROUTES } from '../../config/navigation/navigation.config';

const LandingPage: React.FC = () => {
  const HERO_IMAGE = 'https://i.ibb.co/v4w6wmsv/Chat-GPT-Image-5-may-2026-22-30-33.png';

  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const to = ROUTES.catalog;
    if (searchQuery.trim()) {
      navigate(`${to}?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate(to);
    }
  };

  const chipColor = React.useMemo(() => alpha(theme.palette.secondary.main, 0.1), [theme]);
  const gradient = `linear-gradient(to right, ${theme.palette.primary.main}, ${alpha(theme.palette.primary[800], 0.8)}, transparent)`;
  const gradientOffer = `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary[800]})`;
  return (
    <Box>
      {/* HERO */}
      <Box
        sx={{
          position: 'relative',
          minHeight: 580,
          display: 'flex',
          alignItems: 'center',
          bgcolor: theme.palette.primary.main,
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
            background: gradient,
          }}
        />

        <Container sx={{ position: 'relative', py: 8 }}>
          <Grid container spacing={6} sx={{ alignItems: 'center' }}>
            <Grid>
              <Chip
                label="+248 libros disponibles"
                sx={{
                  mb: 3,
                  bgcolor: chipColor,
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

              <Typography sx={{ color: 'primary.contrastText', mb: 4 }}>
                Descubre miles de libros físicos y digitales. Desde clásicos atemporales hasta los
                bestsellers más recientes.
              </Typography>

              {/* SEARCH */}
              <Box component="form" onSubmit={handleSearch} sx={{ mb: 3 }}>
                <Paper
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 3,
                    overflow: 'hidden',
                  }}
                >
                  <Search sx={{ ml: 2, color: 'common.grey' }} />
                  <TextField
                    variant="standard"
                    placeholder="Buscar libros, autores, géneros..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    sx={{ flex: 1, mx: 2 }}
                  />
                  <Button type="submit" color="secondary" variant="contained">
                    Buscar
                  </Button>
                </Paper>
              </Box>

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
                      bgcolor: chipColor,
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
              background: gradientOffer,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Box>
              <Typography sx={{ color: 'secondary.main', mb: 1 }}>OFERTA ESPECIAL</Typography>
              <Typography
                variant="h4"
                sx={{
                  color: 'white',
                  fontFamily: 'Caveat, cursive',
                  fontWeight: 700,
                }}
              >
                Por la compra de dos o más libros
              </Typography>
              <Typography sx={{ color: 'common.white' }}>
                El envío es{' '}
                <Typography component="span" sx={{ color: 'secondary.text' }}>
                  GRATIS
                </Typography>
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
