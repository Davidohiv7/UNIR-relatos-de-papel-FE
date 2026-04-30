import type { BookFormat, Category, Customer, OrderStatus } from '../types';

// ─── Respuestas genéricas ──────────────────────────────────────────────────

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

// ─── Params de consulta ────────────────────────────────────────────────────

export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type GetBooksParams = PaginationParams & {
  search?: string;
  categoryId?: number;
  format?: BookFormat;
  featured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  language?: string;
  sortBy?: 'price' | 'rating' | 'year' | 'title';
  sortOrder?: 'asc' | 'desc';
};

export type GetOrdersParams = {
  customerId?: number;
  status?: OrderStatus;
  /** Fecha ISO: "2025-01-01" */
  from?: string;
  /** Fecha ISO: "2025-12-31" */
  to?: string;
};

// ─── Metadatos del catálogo ────────────────────────────────────────────────

export type BookFiltersMetadata = {
  categories: Category[];
  languages: string[];
  priceRange: { min: number; max: number };
};

// ─── Estadísticas de pedidos ───────────────────────────────────────────────

export type OrderStats = {
  total: number;
  byStatus: Record<OrderStatus, number>;
  totalSpent: number;
};

// ─── DTOs de clientes ──────────────────────────────────────────────────────

export type SafeCustomer = Omit<Customer, 'password'>;

export type LoginDto = {
  email: string;
  password: string;
};

export type RegisterDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
};

export type UpdateCustomerDto = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
};

export type ChangePasswordDto = {
  currentPassword: string;
  newPassword: string;
};

// ─── DTOs de libros ────────────────────────────────────────────────────────

export type CreateBookDto = {
  title: string;
  author: string;
  description: string;
  language: string;
  format: BookFormat;
  year: number;
  price: number;
  stock: number;
  pages: number;
  isbn: string;
  categoryIds: number[];
  tagId?: number;
  featured?: boolean;
};

/** ISBN excluido — no cambia tras la publicación */
export type UpdateBookDto = Partial<Omit<CreateBookDto, 'isbn'>>;

// ─── DTOs de direcciones ───────────────────────────────────────────────────

export type CreateAddressDto = {
  line1: string;
  line2?: string;
  city: string;
};

export type UpdateAddressDto = Partial<CreateAddressDto>;

// ─── DTOs de pedidos ───────────────────────────────────────────────────────

export type CreateOrderItemDto = {
  bookId: number;
  quantity: number;
};

export type CreateOrderDto = {
  customerId: number;
  addressId?: number;
  items: CreateOrderItemDto[];
};

export type UpdateOrderDto = {
  status?: OrderStatus;
  addressId?: number;
};
