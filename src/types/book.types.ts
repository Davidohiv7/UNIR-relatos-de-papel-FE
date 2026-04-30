export enum BookFormat {
  PHYSICAL = 'fisico',
  DIGITAL = 'digital',
}

export type BookCategory = {
  id: number;
  name: string;
};

export type Book = {
  id: number;
  title: string;
  author: string;
  description: string;
  images: string[];
  ranking: number;
  language: string;
  type: BookFormat;
  year: number;
  categories: BookCategory[];
  price: number;
  stock: number;
};
