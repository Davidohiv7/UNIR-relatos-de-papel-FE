// ─── Servicios ────────────────────────────────────────────────────────────
export { booksService } from './books/books.service';
export { customersService } from './customers/customers.service';
export { ordersService } from './orders/orders.service';
export { addressesService } from './addresses/addresses.service';

// ─── Cliente HTTP y utilidades ────────────────────────────────────────────
export { apiClient, ApiError, buildQuery, tokenManager } from './api/apiClient';
export type { RequestOptions } from './api/apiClient';

// ─── DTOs y tipos de respuesta ────────────────────────────────────────────
export type {
  // Genéricos
  PaginatedResponse,
  PaginationParams,
  // Libros
  GetBooksParams,
  BookFiltersMetadata,
  CreateBookDto,
  UpdateBookDto,
  // Clientes
  SafeCustomer,
  LoginDto,
  RegisterDto,
  UpdateCustomerDto,
  ChangePasswordDto,
  // Pedidos
  GetOrdersParams,
  OrderStats,
  CreateOrderDto,
  CreateOrderItemDto,
  UpdateOrderDto,
  // Direcciones
  CreateAddressDto,
  UpdateAddressDto,
} from './types';
