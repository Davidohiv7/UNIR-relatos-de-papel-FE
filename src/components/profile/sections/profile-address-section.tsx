import { type FC, useState } from 'react';
import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { AddAddressModal, AddressList } from '../../address';
import type { SafeCustomer } from '../../../services';
import { useAddressState } from '../../../hooks';

type Props = {
  customer: SafeCustomer;
};

const ProfileAddressesSection: FC<Props> = ({ customer }) => {
  const { addresses, addAddress } = useAddressState(customer.id);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card>
        <CardContent>
          <Stack
            direction="row"
            sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
          >
            <Typography variant="h4">Mis Direcciones</Typography>
            <Button startIcon={<Add />} variant="outlined" onClick={() => setIsOpen(true)}>
              Agregar
            </Button>
          </Stack>
          <AddressList addresses={addresses} />
        </CardContent>
      </Card>
      <AddAddressModal open={isOpen} onClose={() => setIsOpen(false)} onSubmit={addAddress} />
    </>
  );
};

export default ProfileAddressesSection;
