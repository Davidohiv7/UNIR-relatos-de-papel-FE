import { Book } from './book.types';

export class CartItem {
  book: Book;
  quantity: number;
}

export type Cart = Record<number, CartItem>;
