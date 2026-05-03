import { Stack, Typography } from '@mui/material';
import type { Address } from '../../types';
import AddressCard from './address-card';

type Props = {
  addresses: Address[];
  selectedValue?: number;
  onSelect?: (id: number) => void;
};

function AddressList({ addresses, selectedValue, onSelect }: Props) {
  if (addresses.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No tienes direcciones guardadas todavía.
      </Typography>
    );
  }

  return (
    <Stack spacing={1.5}>
      {addresses.map(address => (
        <AddressCard
          key={address.id}
          address={address}
          isSelected={selectedValue === address.id}
          onSelect={onSelect}
        />
      ))}
    </Stack>
  );
}

export default AddressList;
