import { Stack, Typography } from '@mui/material';
import type { Order } from '../../../../types';
import OrderCard from './profile-order-card';
import { FC } from 'react';

type Props = {
  orders: Order[];
};

const ProfileOrderList: FC<Props> = ({ orders }) => {
  if (orders.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        Todavía no has hecho ningún pedido.
      </Typography>
    );
  }

  return (
    <Stack spacing={1.5}>
      {orders.map(order => (
        <OrderCard key={order.id} order={order} />
      ))}
    </Stack>
  );
};

export default ProfileOrderList;
