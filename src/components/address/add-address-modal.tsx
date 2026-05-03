import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import AddressForm from './address-form';
import { AddressInput } from '../../types/address.types';

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (address: AddressInput) => void;
};

function AddAddressModal({ open, onClose, onSubmit }: Props) {
  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (address: AddressInput) => {
    onSubmit(address);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Agregar dirección</DialogTitle>
      <DialogContent>
        <AddressForm onSubmit={handleSubmit} onCancel={handleClose} />
      </DialogContent>
    </Dialog>
  );
}

export default AddAddressModal;
