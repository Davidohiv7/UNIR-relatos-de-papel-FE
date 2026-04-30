import type { Order } from './order.types';

export type Address = {
  street: string;
  city: string;
  phone: string;
};

export type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  address: Address;
  orders: Order[];
};
