import type { Customer } from '../types';

export const mockUsers: Customer[] = [
  {
    id: 1,
    firstName: 'Ana',
    lastName: 'García López',
    email: 'ana@relatos.com',
    password: 'password123',
    avatar: 'AG',
    phone: '+34 612 345 678',
  },
  {
    id: 2,
    firstName: 'Maria',
    lastName: 'García Lopez',
    email: 'maria@relatos.com',
    password: 'password123',
    avatar: 'MG',
    phone: '+57 312 345 678',
  },
  {
    id: 3,
    firstName: 'Jesús',
    lastName: 'Pérez Mendez',
    email: 'jesus@relatos.com',
    password: 'password123',
    avatar: 'JP',
    phone: '+507 612 345 678',
  },
];
