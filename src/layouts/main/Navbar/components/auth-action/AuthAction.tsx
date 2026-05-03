import { useState, type MouseEvent } from 'react';
import { CircularProgress, IconButton } from '@mui/material';
import { PersonOutlineOutlined } from '@mui/icons-material';
import { useAuth } from '../../../../../hooks';
import { CustomerAvatar } from '../../../../../components/ui';
import AuthActionsList from './AuthActionsList';

function AuthAction() {
  const { customer, isInitializing } = useAuth();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const close = () => setAnchorEl(null);

  const renderTrigger = () => {
    if (isInitializing) {
      return <CircularProgress size={20} thickness={4} sx={{ color: 'primary.main' }} />;
    }
    if (customer) {
      return (
        <CustomerAvatar firstName={customer.firstName} lastName={customer.lastName} size="small" />
      );
    }
    return <PersonOutlineOutlined />;
  };

  return (
    <>
      <IconButton aria-label="cuenta" onClick={open} sx={{ color: 'primary.main' }}>
        {renderTrigger()}
      </IconButton>
      <AuthActionsList anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={close} />
    </>
  );
}

export default AuthAction;
