import { Button, Card, CardContent, Fade, Stack, Typography } from '@mui/material';

function CatalogEmptyState({ onClear }: { onClear: () => void }) {
  return (
    <Fade in timeout={300}>
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent>
          <Stack spacing={1.5} sx={{ alignItems: 'flex-start' }}>
            <Typography variant="h6">No encontramos libros</Typography>
            <Typography color="text.secondary">
              Prueba ajustando los filtros o limpia la búsqueda para ver más opciones.
            </Typography>
            <Button variant="contained" onClick={onClear}>
              Limpiar filtros
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Fade>
  );
}

export default CatalogEmptyState;
