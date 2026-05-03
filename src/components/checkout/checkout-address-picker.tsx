import { type FC, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { AddAddressModal, AddressList } from '../address';
import type { Address } from '../../types';
import type { AddressInput } from '../../types/address.types';

type Props = {
  addresses: Address[];
  selectedAddressId: number | null;
  onSelect: (id: number) => void;
  onAddAddress: (address: AddressInput) => void;
};

const CheckoutAddressPicker: FC<Props> = ({
  addresses,
  selectedAddressId,
  onSelect,
  onAddAddress,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = (address: AddressInput) => {
    onAddAddress(address);
    setIsModalOpen(false);
  };

  return (
    <>
      <Box>
        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
        >
          <Typography variant="h5">Dirección de envío</Typography>
          {addresses.length > 0 && (
            <Button
              startIcon={<Add />}
              variant="outlined"
              size="small"
              onClick={() => setIsModalOpen(true)}
            >
              Agregar
            </Button>
          )}
        </Stack>

        {addresses.length === 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body1" color="text.secondary">
              Aún no tienes ninguna dirección guardada.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Haz clic en <strong>Agregar dirección</strong> para continuar con tu compra.
            </Typography>
            <Button
              startIcon={<Add />}
              variant="contained"
              onClick={() => setIsModalOpen(true)}
            >
              Agregar dirección
            </Button>
          </Box>
        ) : (
          <AddressList
            addresses={addresses}
            selectedValue={selectedAddressId ?? undefined}
            onSelect={onSelect}
          />
        )}
      </Box>

      <AddAddressModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAdd}
      />
    </>
  );
};

export default CheckoutAddressPicker;
