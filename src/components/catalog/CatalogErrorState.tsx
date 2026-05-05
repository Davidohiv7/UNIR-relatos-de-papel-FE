import { Button, Card, CardContent, Stack, Typography } from '@mui/material';

function CatalogErrorState({ message }: { message: string }) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <CardContent>
        <Stack spacing={1.5}>
          <Typography variant="subtitle1" color="error">
            {message}
          </Typography>
          <Button variant="outlined" onClick={() => window.location.reload()}>
            Reintentar
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
export default CatalogErrorState;
