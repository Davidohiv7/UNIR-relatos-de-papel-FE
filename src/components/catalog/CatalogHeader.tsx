import { Stack, Typography } from '@mui/material';

function CatalogHeader() {
  return (
    <Stack spacing={1}>
      <Typography variant="h3">Catálogo</Typography>
      <Typography color="text.secondary">
        Explora libros físicos y digitales y ajusta los filtros según tu lectura ideal.
      </Typography>
    </Stack>
  );
}

export default CatalogHeader;
