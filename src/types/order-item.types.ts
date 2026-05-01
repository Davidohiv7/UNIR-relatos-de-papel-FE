import type { Book } from './book.types';

export type OrderItem = {
  id: number;
  book: Book;
  quantity: number;
  priceAtPurchase: number;
};
