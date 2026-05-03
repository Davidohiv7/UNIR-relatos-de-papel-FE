import { useState, type FormEvent } from 'react';
import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import { SafeCustomer } from '../../../services';

type Props = {
  customer: SafeCustomer;
};

function ProfileFormSection({ customer }: Props) {
  const [firstName, setFirstName] = useState(customer.firstName);
  const [lastName, setLastName] = useState(customer.lastName);
  const [phone, setPhone] = useState(customer.phone);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // TODO: persistir cambios cuando esté el endpoint
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Mi Perfil
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Nombre"
              value={firstName}
              onChange={event => setFirstName(event.target.value)}
              fullWidth
            />
            <TextField
              label="Apellido"
              value={lastName}
              onChange={event => setLastName(event.target.value)}
              fullWidth
            />
            <TextField
              label="Teléfono"
              value={phone}
              onChange={event => setPhone(event.target.value)}
              fullWidth
            />
            <Box>
              <Button type="submit" variant="contained">
                Guardar cambios
              </Button>
            </Box>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProfileFormSection;
