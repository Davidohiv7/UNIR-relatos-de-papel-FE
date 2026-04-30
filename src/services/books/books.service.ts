import type { Book, Category } from '../../types';
import { books as rawMockBooks } from '../../mocks/books.mock';
import { apiClient, buildQuery } from '../api/apiClient';
import { USE_MOCK } from '../config';
import type {
  PaginatedResponse,
  GetBooksParams,
  PaginationParams,
  BookFiltersMetadata,
  CreateBookDto,
  UpdateBookDto,
} from '../types';

// ─── Mock store (lazy — se inicializa solo al primer uso) ──────────────────

let _store: Book[] | null = null;
let _nextId: number | null = null;

function getStore(): Book[] {
  if (!_store) _store = [...rawMockBooks];
  return _store;
}

function nextMockId(): number {
  if (_nextId === null) {
    _nextId = getStore().reduce((max, b) => Math.max(max, b.id), 0) + 1;
  }
  return _nextId++;
}

// ─── Helpers de filtrado y paginación ─────────────────────────────────────

function paginate<T>(items: T[], page: number, limit: number): PaginatedResponse<T> {
  const total = items.length;
  const start = (page - 1) * limit;
  return {
    data: items.slice(start, start + limit),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

function applyFilters(params: GetBooksParams = {}): Book[] {
  const {
    search,
    categoryId,
    format,
    featured,
    minPrice,
    maxPrice,
    language,
    sortBy,
    sortOrder = 'asc',
  } = params;
  let result = [...getStore()];

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
    );
  }
  if (categoryId !== undefined)
    result = result.filter(b => b.categories.some(c => c.id === categoryId));
  if (format !== undefined) result = result.filter(b => b.format === format);
  if (featured !== undefined) result = result.filter(b => Boolean(b.featured) === featured);
  if (minPrice !== undefined) result = result.filter(b => b.price >= minPrice);
  if (maxPrice !== undefined) result = result.filter(b => b.price <= maxPrice);
  if (language) result = result.filter(b => b.language.toLowerCase() === language.toLowerCase());
  if (sortBy) {
    result.sort((a, b) => {
      const dir = sortOrder === 'desc' ? -1 : 1;
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      if (typeof aVal === 'string' && typeof bVal === 'string')
        return dir * aVal.localeCompare(bVal);
      if (typeof aVal === 'number' && typeof bVal === 'number') return dir * (aVal - bVal);
      return 0;
    });
  }
  return result;
}

// ─── Servicio ──────────────────────────────────────────────────────────────

export const booksService = {
  // ── Catálogo ────────────────────────────────────────────────────────────

  /** Lista paginada con filtros opcionales */
  async getBooks(params?: GetBooksParams, signal?: AbortSignal): Promise<PaginatedResponse<Book>> {
    if (USE_MOCK) {
      const { page = 1, limit = 20 } = params ?? {};
      return paginate(applyFilters(params), page, limit);
    }
    return apiClient.get<PaginatedResponse<Book>>(
      '/books' + buildQuery(params as Record<string, unknown>),
      { signal }
    );
  },

  /** Detalle de un libro; null si no existe */
  async getBookById(id: number, signal?: AbortSignal): Promise<Book | null> {
    if (USE_MOCK) return getStore().find(b => b.id === id) ?? null;
    try {
      return await apiClient.get<Book>(`/books/${id}`, { signal });
    } catch {
      return null;
    }
  },

  /** Libros marcados como destacados */
  async getFeaturedBooks(limit = 10, signal?: AbortSignal): Promise<Book[]> {
    if (USE_MOCK)
      return getStore()
        .filter(b => b.featured)
        .slice(0, limit);
    return apiClient.get<Book[]>(`/books/featured?limit=${limit}`, { signal });
  },

  /** Búsqueda por título o autor con paginación */
  async searchBooks(
    query: string,
    params?: GetBooksParams,
    signal?: AbortSignal
  ): Promise<PaginatedResponse<Book>> {
    if (USE_MOCK) {
      const { page = 1, limit = 20 } = params ?? {};
      return paginate(applyFilters({ ...params, search: query }), page, limit);
    }
    return apiClient.get<PaginatedResponse<Book>>(
      '/books/search' + buildQuery({ ...params, search: query } as Record<string, unknown>),
      { signal }
    );
  },

  /** Todos los libros de un autor con paginación */
  async getBooksByAuthor(
    author: string,
    params: PaginationParams = {},
    signal?: AbortSignal
  ): Promise<PaginatedResponse<Book>> {
    if (USE_MOCK) {
      const q = author.toLowerCase();
      const filtered = getStore().filter(b => b.author.toLowerCase().includes(q));
      const { page = 1, limit = 20 } = params;
      return paginate(filtered, page, limit);
    }
    return apiClient.get<PaginatedResponse<Book>>(
      `/books/author/${encodeURIComponent(author)}` + buildQuery(params as Record<string, unknown>),
      { signal }
    );
  },

  /** Libros de la misma categoría, excluyendo el libro fuente — para "También te puede gustar" */
  async getRelatedBooks(bookId: number, limit = 8, signal?: AbortSignal): Promise<Book[]> {
    if (USE_MOCK) {
      const source = getStore().find(b => b.id === bookId);
      if (!source) return [];
      const categoryIds = new Set(source.categories.map(c => c.id));
      return getStore()
        .filter(b => b.id !== bookId && b.categories.some(c => categoryIds.has(c.id)))
        .slice(0, limit);
    }
    return apiClient.get<Book[]>(`/books/${bookId}/related?limit=${limit}`, { signal });
  },

  /** Resuelve una lista de IDs a objetos Book — para resolver ítems del carrito */
  async getBooksByIds(ids: number[], signal?: AbortSignal): Promise<Book[]> {
    if (USE_MOCK) return getStore().filter(b => ids.includes(b.id));
    return apiClient.get<Book[]>(`/books/by-ids?ids=${ids.join(',')}`, { signal });
  },

  // ── Metadatos del catálogo ───────────────────────────────────────────────

  /** Todas las categorías únicas del catálogo, ordenadas alfabéticamente */
  async getBookCategories(signal?: AbortSignal): Promise<Category[]> {
    if (USE_MOCK) {
      const seen = new Set<number>();
      const categories: Category[] = [];
      for (const book of getStore()) {
        for (const cat of book.categories) {
          if (!seen.has(cat.id)) {
            seen.add(cat.id);
            categories.push(cat);
          }
        }
      }
      return categories.sort((a, b) => a.name.localeCompare(b.name));
    }
    return apiClient.get<Category[]>('/categories', { signal });
  },

  /** Todos los idiomas únicos del catálogo */
  async getBookLanguages(signal?: AbortSignal): Promise<string[]> {
    if (USE_MOCK) return [...new Set(getStore().map(b => b.language))].sort();
    return apiClient.get<string[]>('/books/languages', { signal });
  },

  /** Rango de precios del catálogo — para el slider de filtro */
  async getBookPriceRange(signal?: AbortSignal): Promise<{ min: number; max: number }> {
    if (USE_MOCK) {
      const prices = getStore().map(b => b.price);
      return { min: Math.min(...prices), max: Math.max(...prices) };
    }
    return apiClient.get<{ min: number; max: number }>('/books/price-range', { signal });
  },

  /** Categorías + idiomas + rango de precio en una sola llamada — para montar el panel de filtros */
  async getBookFiltersMetadata(signal?: AbortSignal): Promise<BookFiltersMetadata> {
    if (USE_MOCK) {
      const [categories, languages, priceRange] = await Promise.all([
        booksService.getBookCategories(signal),
        booksService.getBookLanguages(signal),
        booksService.getBookPriceRange(signal),
      ]);
      return { categories, languages, priceRange };
    }
    return apiClient.get<BookFiltersMetadata>('/books/filters-metadata', { signal });
  },

  // ── CRUD (admin) ─────────────────────────────────────────────────────────

  /** Crea un libro nuevo — uso exclusivo de administración */
  async createBook(dto: CreateBookDto, signal?: AbortSignal): Promise<Book> {
    if (USE_MOCK) {
      const categories = dto.categoryIds.map(id => ({ id, name: `Categoría ${id}` }));
      const newBook: Book = {
        id: nextMockId(),
        title: dto.title,
        author: dto.author,
        description: dto.description,
        language: dto.language,
        format: dto.format,
        year: dto.year,
        price: dto.price,
        stock: dto.stock,
        pages: dto.pages,
        isbn: dto.isbn,
        categories,
        pictures: [],
        rating: 0,
        reviewsCount: 0,
        featured: dto.featured,
      };
      getStore().push(newBook);
      return { ...newBook };
    }
    return apiClient.post<Book>('/books', dto, { signal });
  },

  /** Actualiza un libro existente; null si no existe */
  async updateBook(id: number, dto: UpdateBookDto, signal?: AbortSignal): Promise<Book | null> {
    if (USE_MOCK) {
      const store = getStore();
      const index = store.findIndex(b => b.id === id);
      if (index === -1) return null;
      const categories = dto.categoryIds
        ? dto.categoryIds.map(cid => ({ id: cid, name: `Categoría ${cid}` }))
        : store[index].categories;
      store[index] = { ...store[index], ...dto, categories };
      return { ...store[index] };
    }
    try {
      return await apiClient.patch<Book>(`/books/${id}`, dto, { signal });
    } catch {
      return null;
    }
  },

  /** Elimina un libro; devuelve true si existía */
  async deleteBook(id: number, signal?: AbortSignal): Promise<boolean> {
    if (USE_MOCK) {
      const store = getStore();
      const index = store.findIndex(b => b.id === id);
      if (index === -1) return false;
      store.splice(index, 1);
      return true;
    }
    try {
      await apiClient.delete(`/books/${id}`, { signal });
      return true;
    } catch {
      return false;
    }
  },

  // Utilidad para tests: reinicia el mock store
  _resetMockStore(): void {
    _store = null;
    _nextId = null;
  },
};
