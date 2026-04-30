import { OrderStatus, type Order, type OrderItem } from '../../types';
import { mockOrders } from '../../mocks/orders.mock';
import { mockUsers } from '../../mocks/customer.mock';
import { books as mockBooks } from '../../mocks/books.mock';
import { apiClient, buildQuery } from '../api/apiClient';
import { USE_MOCK } from '../config';
import type { CreateOrderDto, GetOrdersParams, OrderStats, UpdateOrderDto } from '../types';

// ─── Mock store mutable ────────────────────────────────────────────────────

let _store: Order[] = [...mockOrders];
let _nextId = _store.length + 1;

function buildMockOrder(dto: CreateOrderDto): Order {
  const customer = mockUsers.find(u => u.id === dto.customerId);
  if (!customer) throw new Error(`Cliente ${dto.customerId} no encontrado`);

  const orderItems: OrderItem[] = dto.items.map((item, i) => {
    const book = mockBooks.find(b => b.id === item.bookId);
    if (!book) throw new Error(`Libro ${item.bookId} no encontrado`);
    return { id: Date.now() + i, book, quantity: item.quantity, priceAtPurchase: book.price };
  });

  const total = orderItems.reduce((sum, item) => sum + item.priceAtPurchase * item.quantity, 0);

  return {
    id: _nextId++,
    customer,
    status: OrderStatus.PENDING,
    orderItems,
    total,
    createdAt: new Date(),
  };
}

function applyFilters(orders: Order[], params: GetOrdersParams): Order[] {
  let result = orders;
  if (params.customerId !== undefined)
    result = result.filter(o => o.customer.id === params.customerId);
  if (params.status !== undefined) result = result.filter(o => o.status === params.status);
  if (params.from) {
    const from = new Date(params.from);
    result = result.filter(o => o.createdAt >= from);
  }
  if (params.to) {
    const to = new Date(params.to);
    result = result.filter(o => o.createdAt <= to);
  }
  return result;
}

// ─── Servicio ──────────────────────────────────────────────────────────────

export const ordersService = {
  // ── CRUD ────────────────────────────────────────────────────────────────

  /** Lista pedidos con filtros opcionales: cliente, estado, rango de fechas */
  async getOrders(params?: GetOrdersParams, signal?: AbortSignal): Promise<Order[]> {
    if (USE_MOCK) return applyFilters([..._store], params ?? {});
    return apiClient.get<Order[]>('/orders' + buildQuery(params as Record<string, unknown>), {
      signal,
    });
  },

  /** Detalle de un pedido; null si no existe */
  async getOrderById(id: number, signal?: AbortSignal): Promise<Order | null> {
    if (USE_MOCK) return _store.find(o => o.id === id) ?? null;
    try {
      return await apiClient.get<Order>(`/orders/${id}`, { signal });
    } catch {
      return null;
    }
  },

  /** Crea un pedido nuevo con estado PENDING */
  async createOrder(dto: CreateOrderDto, signal?: AbortSignal): Promise<Order> {
    if (USE_MOCK) {
      const order = buildMockOrder(dto);
      _store.push(order);
      return order;
    }
    return apiClient.post<Order>('/orders', dto, { signal });
  },

  /** Actualiza estado o dirección de un pedido; null si no existe — uso admin */
  async updateOrder(id: number, dto: UpdateOrderDto, signal?: AbortSignal): Promise<Order | null> {
    if (USE_MOCK) {
      const order = _store.find(o => o.id === id);
      if (!order) return null;
      if (dto.status) {
        order.status = dto.status;
        if (dto.status === OrderStatus.DELIVERED) order.deliveredAt = new Date();
      }
      return { ...order };
    }
    try {
      return await apiClient.patch<Order>(`/orders/${id}`, dto, { signal });
    } catch {
      return null;
    }
  },

  /** Elimina un pedido del sistema; devuelve true si existía — uso admin */
  async deleteOrder(id: number, signal?: AbortSignal): Promise<boolean> {
    if (USE_MOCK) {
      const index = _store.findIndex(o => o.id === id);
      if (index === -1) return false;
      _store.splice(index, 1);
      return true;
    }
    try {
      await apiClient.delete(`/orders/${id}`, { signal });
      return true;
    } catch {
      return false;
    }
  },

  // ── Consultas de dominio ─────────────────────────────────────────────────

  /** Todos los pedidos de un cliente, del más reciente al más antiguo */
  async getOrdersByCustomer(customerId: number, signal?: AbortSignal): Promise<Order[]> {
    const orders = await ordersService.getOrders({ customerId }, signal);
    return orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },

  /** Pedidos filtrados por estado */
  async getOrdersByStatus(status: OrderStatus, signal?: AbortSignal): Promise<Order[]> {
    return ordersService.getOrders({ status }, signal);
  },

  /** Cancela un pedido; lanza si no existe o si ya fue entregado */
  async cancelOrder(id: number, signal?: AbortSignal): Promise<Order> {
    if (USE_MOCK) {
      const order = _store.find(o => o.id === id);
      if (!order) throw new Error(`Pedido ${id} no encontrado`);
      if (order.status === OrderStatus.DELIVERED)
        throw new Error('No se puede cancelar un pedido ya entregado');
    }
    return ordersService.updateOrderStatus(id, OrderStatus.CANCELLED, signal);
  },

  /** Actualiza el estado de un pedido — uso admin / webhook de mensajería */
  async updateOrderStatus(id: number, status: OrderStatus, signal?: AbortSignal): Promise<Order> {
    if (USE_MOCK) {
      const order = _store.find(o => o.id === id);
      if (!order) throw new Error(`Pedido ${id} no encontrado`);
      order.status = status;
      if (status === OrderStatus.DELIVERED) order.deliveredAt = new Date();
      return { ...order };
    }
    return apiClient.patch<Order>(`/orders/${id}`, { status }, { signal });
  },

  /** Estadísticas de pedidos de un cliente — para el dashboard del perfil */
  async getOrderStats(customerId: number, signal?: AbortSignal): Promise<OrderStats> {
    const orders = await ordersService.getOrders({ customerId }, signal);

    const byStatus = Object.values(OrderStatus).reduce(
      (acc, status) => ({ ...acc, [status]: orders.filter(o => o.status === status).length }),
      {} as Record<OrderStatus, number>
    );

    const totalSpent = orders
      .filter(o => o.status !== OrderStatus.CANCELLED)
      .reduce((sum, o) => sum + o.total, 0);

    return { total: orders.length, byStatus, totalSpent };
  },

  /**
   * Comprueba si un cliente ya compró un libro (pedidos no cancelados).
   * Útil para el badge "Ya lo tienes" en la ficha del libro.
   */
  async checkBookPurchased(
    customerId: number,
    bookId: number,
    signal?: AbortSignal
  ): Promise<boolean> {
    const orders = await ordersService.getOrders({ customerId }, signal);
    return orders.some(
      o => o.status !== OrderStatus.CANCELLED && o.orderItems.some(item => item.book.id === bookId)
    );
  },

  // Utilidad para tests: reinicia el mock store
  _resetMockStore(): void {
    _store = [...mockOrders];
    _nextId = _store.length + 1;
  },
};
