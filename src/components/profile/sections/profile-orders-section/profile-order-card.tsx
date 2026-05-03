import { Card, CardContent, Stack, Typography } from '@mui/material';
import type { Order } from '../../../../types';
import { formatDateTimeEs } from '../../../../utils/date.utils';
import { FC } from 'react';

type Props = {
  order: Order;
};

const ProfileOrderCard: FC<Props> = ({ order }) => {
  const itemCount = order.orderItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack spacing={0.5}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Pedido #{order.id}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatDateTimeEs(order.createdAt)}
            </Typography>
          </Stack>
          <Stack spacing={0.5} sx={{ alignItems: 'flex-end' }}>
            <Typography variant="body2" color="text.secondary">
              {itemCount} {itemCount === 1 ? 'libro' : 'libros'}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              ${order.total.toFixed(2)}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProfileOrderCard;
