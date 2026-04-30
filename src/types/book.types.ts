export type BookFormat = 'fisico' | 'digital';

export type Book = {
  id: number;
  title: string;
  author: string;
  description: string;
  images: string[];
  language: string;
  type: BookFormat;
  year: number;
  genres: string[];
  price: number;
  stock: number;
  rating: number;
  originalPrice?: number;
  pages: number;
  isbn: string;
  reviews: number;
  badge?:
    | 'Bestseller'
    | 'Nuevo'
    | 'Recomendado'
    | 'Oferta'
    | 'Clásico'
    | 'Premio Nobel'
    | 'Autor Destacado'
    | 'Edición Limitada';
  featured?: boolean;
};
