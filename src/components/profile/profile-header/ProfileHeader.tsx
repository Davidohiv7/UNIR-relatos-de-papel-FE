import { Box, Stack, Typography } from '@mui/material';
import { SafeCustomer } from '../../../services';
import { CustomerAvatar } from '../../ui';

type Props = {
  customer: SafeCustomer;
};

function ProfileHeader({ customer }: Props) {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        borderRadius: 3,
        p: 3,
      }}
    >
      <Stack direction="row" spacing={3}>
        <CustomerAvatar firstName={customer.firstName} lastName={customer.lastName} size="large" />
        <Box>
          <Typography variant="h3">
            {customer.firstName} {customer.lastName}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            {customer.email}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default ProfileHeader;
