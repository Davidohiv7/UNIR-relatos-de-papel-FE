import { OrderStatus, type Order } from '../types';
import { mockUsers } from './customer.mock';
import { books } from './books.mock';

export const mockOrders: Order[] = [
  {
    id: 1,
    customer: mockUsers[0],
    address: { id: 1, line1: 'Calle Mayor 12', city: 'Madrid' },
    status: OrderStatus.DELIVERED,
    orderItems: [
      { id: 1, book: books[0], quantity: 1, priceAtPurchase: books[0].price },
      { id: 2, book: books[2], quantity: 2, priceAtPurchase: books[2].price },
    ],
    total: books[0].price + books[2].price * 2,
    createdAt: new Date('2024-12-01'),
    deliveredAt: new Date('2024-12-05'),
  },
  {
    id: 2,
    customer: mockUsers[1],
    status: OrderStatus.PENDING,
    orderItems: [{ id: 3, book: books[1], quantity: 1, priceAtPurchase: books[1].price }],
    total: books[1].price,
    createdAt: new Date('2025-01-15'),
  },
  {
    id: 3,
    customer: mockUsers[0],
    address: { id: 2, line1: 'Avenida Reforma 45', city: 'Ciudad de México' },
    status: OrderStatus.SHIPPED,
    orderItems: [{ id: 4, book: books[3], quantity: 3, priceAtPurchase: books[3].price }],
    total: books[3].price * 3,
    createdAt: new Date('2025-02-20'),
  },
  {
    id: 4,
    customer: mockUsers[2],
    address: { id: 3, line1: 'Vía Argentina 8', city: 'Panamá' },
    status: OrderStatus.CANCELLED,
    orderItems: [
      { id: 5, book: books[4], quantity: 1, priceAtPurchase: books[4].price },
      { id: 6, book: books[5], quantity: 1, priceAtPurchase: books[5].price },
    ],
    total: books[4].price + books[5].price,
    createdAt: new Date('2025-03-10'),
  },
];
