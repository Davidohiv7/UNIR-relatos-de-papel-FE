import { BookFormat } from '../types';
import type { Cart } from '../types/cart.types';

export const mockCart: Cart = {
  '465': {
    book: {
      id: 465,
      title: 'Bhole/Adventures Of A Young Yogi',
      author: 'Hema de Munnik',
      description:
        'Bhole/Adventures Of A Young Yogi es una obra recuperada desde Open Library para la colección de Relatos de Papel. Firmada por Hema de Munnik, se integra en la categoría divulgativos y ofrece una lectura pensada para explorar el catálogo con variedad, contexto y una ficha rica. La edición consultada fue publicada por primera vez en 2006 y cuenta con 29 referencias relacionadas en la plataforma.',
      pictures: [
        {
          id: 2268937,
          url: 'https://covers.openlibrary.org/b/id/2268937-M.jpg',
        },
        {
          id: 2268938,
          url: 'https://covers.openlibrary.org/b/id/2268937-L.jpg',
        },
      ],
      rating: 4.1,
      price: 11.8,
      language: 'Inglés',
      format: BookFormat.PHYSICAL,
      year: 2006,
      categories: [
        {
          id: 23,
          name: 'Divulgativos',
        },
      ],
      stock: 9,
      pages: 438,
      isbn: '8188157376',
      reviewsCount: 29,
      tag: {
        id: 3,
        name: 'Recomendado',
      },
      featured: true,
    },
    quantity: 9,
  },
  '634': {
    book: {
      id: 634,
      title: 'Novels (Last Act Remember Me / Scavenger Hunt / Spellbound)',
      author: 'Christopher Pike',
      description:
        'Novels (Last Act Remember Me / Scavenger Hunt / Spellbound) es una obra recuperada desde Open Library para la colección de Relatos de Papel. Firmada por Christopher Pike, se integra en la categoría paranormal y ofrece una lectura pensada para explorar el catálogo con variedad, contexto y una ficha rica. La edición consultada fue publicada por primera vez en 1989 y cuenta con 34 referencias relacionadas en la plataforma.',
      pictures: [
        {
          id: 480742,
          url: 'https://covers.openlibrary.org/b/isbn/0671922491-M.jpg',
        },
        {
          id: 480743,
          url: 'https://covers.openlibrary.org/b/isbn/0671922491-L.jpg',
        },
      ],
      rating: 4.1,
      price: 18.2,
      language: 'Inglés',
      format: BookFormat.PHYSICAL,
      year: 1989,
      categories: [
        {
          id: 10,
          name: 'Paranormal',
        },
      ],
      stock: 25,
      pages: 182,
      isbn: '0671922491',
      reviewsCount: 34,
    },
    quantity: 16,
  },
  '657': {
    book: {
      id: 657,
      title: 'Spooksville - The Little People',
      author: 'Christopher Pike',
      description:
        'Spooksville - The Little People es una obra recuperada desde Open Library para la colección de Relatos de Papel. Firmada por Christopher Pike, se integra en la categoría fantasía y ofrece una lectura pensada para explorar el catálogo con variedad, contexto y una ficha rica. La edición consultada fue publicada por primera vez en 1996 y cuenta con 39 referencias relacionadas en la plataforma.',
      pictures: [
        {
          id: 1334362,
          url: 'https://covers.openlibrary.org/b/id/1334362-M.jpg',
        },
        {
          id: 1334363,
          url: 'https://covers.openlibrary.org/b/id/1334362-L.jpg',
        },
      ],
      rating: 4.9,
      price: 15.8,
      language: 'Inglés',
      format: BookFormat.PHYSICAL,
      year: 1996,
      categories: [
        {
          id: 7,
          name: 'Fantasía',
        },
      ],
      stock: 9,
      pages: 158,
      isbn: '9780671550677',
      reviewsCount: 39,
      tag: {
        id: 1,
        name: 'Bestseller',
      },
      featured: true,
    },
    quantity: 6,
  },
  '675': {
    book: {
      id: 675,
      title: 'Um rosto de menina e outras novelas reais',
      author: 'Josué Montello',
      description:
        'Um rosto de menina e outras novelas reais es una obra recuperada desde Open Library para la colección de Relatos de Papel. Firmada por Josué Montello, se integra en la categoría arte y ofrece una lectura pensada para explorar el catálogo con variedad, contexto y una ficha rica. La edición consultada fue publicada por primera vez en 1978 y cuenta con 29 referencias relacionadas en la plataforma.',
      pictures: [
        {
          id: 298478,
          url: 'https://covers.openlibrary.org/b/isbn/9780606298478-M.jpg',
        },
        {
          id: 298479,
          url: 'https://covers.openlibrary.org/b/isbn/9780606298478-L.jpg',
        },
      ],
      rating: 4.9,
      price: 31.8,
      language: 'Portugués',
      format: BookFormat.PHYSICAL,
      year: 1978,
      categories: [
        {
          id: 25,
          name: 'Arte',
        },
      ],
      stock: 9,
      pages: 558,
      isbn: '9780606298478',
      reviewsCount: 29,
      tag: {
        id: 1,
        name: 'Bestseller',
      },
      featured: true,
    },
    quantity: 9,
  },
};
