import type { Address } from './address.types';
import type { Customer } from './customer.types';
import type { OrderItem } from './order-item.types';

export enum OrderStatus {
  PENDING = 'pendiente',
  SHIPPED = 'enviado',
  DELIVERED = 'entregado',
  CANCELLED = 'cancelado',
}

export type Order = {
  id: number;
  customer: Customer;
  address?: Address;
  status: OrderStatus;
  orderItems: OrderItem[];
  total: number;
  createdAt: Date;
  deliveredAt?: Date;
};
