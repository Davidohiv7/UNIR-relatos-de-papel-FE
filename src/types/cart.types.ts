import { type Book } from './book.types';

export type CartItem = {
  book: Book;
  quantity: number;
};

export type Cart = Record<number, CartItem>;
