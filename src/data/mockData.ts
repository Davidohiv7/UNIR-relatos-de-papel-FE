export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  address: string;
  city: string;
  phone: string;
}

export interface OrderItem {
  bookId: number;
  title: string;
  author: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  dateReceived?: string;
  UserId: number;
  status: 'Entregado' | 'En tránsito' | 'Procesando' | 'Cancelado';
  items: OrderItem[];
  total: number;
  address: string;
}

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'Ana',
    lastName: 'García López',
    email: 'ana@relatos.com',
    password: 'password123',
    avatar: 'AG',
    address: 'Calle Mayor, 42',
    city: 'Panamá',
    phone: '+507 612 345 678',
  },
  {
    id: 2,
    name: 'Maria',
    lastName: 'García Lopez',
    email: 'maria@relatos.com',
    password: 'password123',
    avatar: 'MG',
    address: 'Cra 12 # 34-56',
    city: 'Cali',
    phone: '+57 312 345 6789',
  },
  {
    id: 3,
    name: 'Jesús',
    lastName: 'Pérez Mendez',
    email: 'jesus@relatos.com',
    password: 'password123',
    avatar: 'JP',
    address: 'Calle Mayor, 42',
    city: 'Madrid',
    phone: '+34 612 345 678',
  },
];
