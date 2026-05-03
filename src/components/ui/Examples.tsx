import type { ReactNode } from 'react';
import {
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  Person as PersonIcon,
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';

type SectionProps = {
  title: string;
  children: ReactNode;
};

function Section({ title, children }: SectionProps) {
  return (
    <Box>
      <Typography variant="overline" color="text.secondary">
        {title}
      </Typography>
      <Box sx={{ mt: 1 }}>{children}</Box>
    </Box>
  );
}

function Examples() {
  return (
    <Stack spacing={4} sx={{ p: 4 }}>
      <Typography variant="h3">Material UI — Componentes disponibles</Typography>
      <Divider />

      <Section title="Typography">
        <Stack spacing={1}>
          <Typography variant="h1">Heading 1 — Caveat</Typography>
          <Typography variant="h3">Heading 3 — Caveat</Typography>
          <Typography variant="body1">
            Body 1 — Inter, texto principal de párrafos y descripciones.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Body 2 — texto secundario, metadatos.
          </Typography>
          <Typography variant="caption">Caption — pies de imagen, labels pequeños.</Typography>
        </Stack>
      </Section>

      <Section title="Buttons">
        <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }} useFlexGap>
          <Button variant="contained">Primary</Button>
          <Button variant="contained" color="secondary">
            Secondary
          </Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="text">Text</Button>
          <Button variant="contained" startIcon={<ShoppingCartIcon />}>
            Añadir al carrito
          </Button>
          <Button variant="contained" disabled>
            Disabled
          </Button>
        </Stack>
      </Section>

      <Section title="Icon Buttons & Tooltip">
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Tooltip title="Buscar">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Favoritos">
            <IconButton color="primary">
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Carrito">
            <IconButton color="secondary">
              <ShoppingCartIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Section>

      <Section title="Chips">
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }} useFlexGap>
          <Chip label="Fantasía" />
          <Chip label="Thriller" color="primary" />
          <Chip label="Autoayuda" color="secondary" />
          <Chip label="Clásicos" variant="outlined" />
          <Chip label="Bestseller" color="secondary" onDelete={() => {}} />
        </Stack>
      </Section>

      <Section title="TextField">
        <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }} useFlexGap>
          <TextField label="Buscar libro" variant="outlined" />
          <TextField label="Email" type="email" variant="filled" />
          <TextField label="Estándar" variant="standard" />
        </Stack>
      </Section>

      <Section title="Card">
        <Card sx={{ maxWidth: 320 }}>
          <CardContent>
            <Typography variant="h5">El nombre del viento</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Patrick Rothfuss · Fantasía épica que sigue la historia de Kvothe.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Ver detalle</Button>
            <Button size="small" color="secondary" variant="contained">
              Añadir
            </Button>
          </CardActions>
        </Card>
      </Section>

      <Section title="Paper (surface)">
        <Paper sx={{ p: 2 }} elevation={3}>
          <Typography>Superficie elevada — útil para dropdowns, modales, sidebars.</Typography>
        </Paper>
      </Section>

      <Section title="Alerts">
        <Stack spacing={1}>
          <Alert severity="info">Info: tu sesión expira en 5 minutos.</Alert>
          <Alert severity="success">Éxito: libro añadido al carrito.</Alert>
          <Alert severity="warning">Advertencia: stock limitado.</Alert>
          <Alert severity="error">Error: no se pudo procesar el pago.</Alert>
        </Stack>
      </Section>

      <Section title="Avatar & Badge">
        <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
          <Avatar>
            <PersonIcon />
          </Avatar>
          <Avatar sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText' }}>CV</Avatar>
          <Badge badgeContent={3} color="secondary">
            <ShoppingCartIcon />
          </Badge>
          <Badge variant="dot" color="primary">
            <FavoriteIcon />
          </Badge>
        </Stack>
      </Section>

      <Section title="Form Controls">
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Switch defaultChecked />
          <Checkbox defaultChecked />
          <Checkbox color="secondary" defaultChecked />
        </Stack>
      </Section>

      <Section title="Progress">
        <Stack spacing={2} sx={{ maxWidth: 400 }}>
          <LinearProgress />
          <LinearProgress color="secondary" />
          <CircularProgress />
        </Stack>
      </Section>
    </Stack>
  );
}

export default Examples;
