import type { Address } from './costumer.types';

export type OrderItem = {
  bookId: number;
  title: string;
  price: number;
  quantity: number;
  subtotal: number;
};

export type OrderStatus = 'pendiente' | 'entregado' | 'enviado' | 'cancelado';

export type Order = {
  id: number;
  customerId: number;
  items: OrderItem[];
  createdAt: Date;
  deliveredAt?: Date;
  status: OrderStatus;
  total: number;
  address: Address;
};
