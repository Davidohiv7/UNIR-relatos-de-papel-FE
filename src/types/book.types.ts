import type { Category } from './category.types';
import type { Picture } from './picture.types';
import type { Tag } from './tag.types';

export enum BookFormat {
  PHYSICAL = 'fisico',
  DIGITAL = 'digital',
}

export type Book = {
  id: number;
  title: string;
  author: string;
  description: string;
  language: string;
  format: BookFormat;
  pictures: Picture[];
  year: number;
  categories: Category[];
  price: number;
  stock: number;
  rating: number;
  reviewsCount: number;
  pages: number;
  isbn: string;
  tag?: Tag;
  featured?: boolean;
};
