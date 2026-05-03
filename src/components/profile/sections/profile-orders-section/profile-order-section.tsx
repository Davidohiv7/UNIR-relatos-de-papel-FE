import { Card, CardContent, Typography } from '@mui/material';
import type { SafeCustomer } from '../../../../services';
import { mockOrders } from '../../../../mocks/orders.mock';
import OrderList from './profile-order-list';
import { FC } from 'react';

type Props = {
  customer: SafeCustomer;
};

const ProfileOrdersSection: FC<Props> = ({ customer }) => {
  const orders = mockOrders.filter(order => order.customer.id === customer.id);

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Mis Pedidos
        </Typography>
        <OrderList orders={orders} />
      </CardContent>
    </Card>
  );
};

export default ProfileOrdersSection;
