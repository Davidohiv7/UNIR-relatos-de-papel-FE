# Relatos de Papel — Frontend

Relatos de Papel es la SPA en React del proyecto transversal del máster UNIR. Este repositorio concentra la estructura de rutas, el shell visual, el sistema de diseño con MUI, el modelo de dominio tipado, la capa de servicios, los mocks locales y los contextos de autenticación, carrito de compras y alertas que sostienen el flujo completo de catálogo, ficha de libro, carrito, checkout y perfil.

## Resumen Rápido

- Vite arranca la app y sirve como entorno de desarrollo y build.
- React 19 + TypeScript se usan para construir la UI con componentes funcionales y tipos compartidos.
- React Router v7 define las rutas declarativas.
- MUI centraliza el diseño visual, la paleta y la tipografía.
- La app funciona en modo mock por defecto y puede apuntar a un backend real mediante variables de entorno.
- El carrito persiste en `localStorage` y se sincroniza entre pestañas.
- El README está pensado como guía operativa para entender cómo está montado el proyecto y dónde tocar cada parte.

## Cómo Se Ejecuta La App

1. `src/root.tsx` carga las fuentes globales, `src/root.css` y monta `<App />`.
2. `src/App.tsx` aplica `ThemeProvider`, `AuthProvider`, `ShoppingCartProvider` y `AlertProvider`, y declara todas las rutas.
3. `src/layouts/main/Main.layout.tsx` envuelve las rutas principales con navbar, `Outlet` y footer.
4. Las páginas de `src/pages/*` permanecen delgadas y actúan como puntos de entrada por ruta.
5. `src/services/api/apiClient.ts` centraliza `fetch`, el manejo del token y el reintento en `401`.
6. Los servicios de `src/services/*` eligen entre mock local o API real con `USE_MOCK`.
7. `src/mocks/*` contiene los datos locales de libros, clientes, pedidos y direcciones.
8. `src/types/*` define el contrato común entre UI, servicios y mocks.

## Estado Actual Del Proyecto

- El shell visual (navbar, footer) está montado y funcional con búsqueda inline, acciones de autenticación y badge de carrito.
- El catálogo (`/catalog`) está completamente implementado: filtros por título/autor, categoría, formato, idioma y rango de precio; ordenación; paginación local; skeleton loaders; estado de búsqueda en la URL.
- La ficha de libro (`/book/:id`) está completamente implementada: portada con fallback de color, metadatos, control de cantidad, botón de añadir al carrito, stock, libros relacionados y links rápidos a filtros.
- El carrito funciona: drawer lateral, lista de ítems, `QuantityInput`, eliminar ítem, total y botón de checkout; persiste en `localStorage` y se sincroniza entre pestañas.
- El checkout (`/checkout`) está implementado: selección de dirección de envío, resumen de la orden, flujo de pago con `window.alert` + clear cart + redirect.
- El perfil (`/profile`) está implementado: cabecera con avatar, edición de datos personales, gestión de direcciones y listado de últimos pedidos.
- La autenticación usa `AuthContext`; `ProtectedRoute` guarda `/checkout` y `/profile`; login redirige mediante el parámetro `?redirect=`.
- Las alertas/notificaciones usan `AlertContext` con un hook `useAlert`.
- `BookCardSkeleton` carga en el catálogo mientras se obtienen los datos.
- `BookImage` muestra la portada o un fallback de color generado por el título.
- `QuantityInput` es un componente reutilizable de stepper +/−.
- `CustomerAvatar` es un componente reutilizable de avatar.
- `landing/Landing.page.tsx` y `login/Login.page.tsx` están en scaffold pendientes de contenido final.

## Mapa Del Proyecto

- [src/App.tsx](src/App.tsx): fuente única de verdad para las rutas y árbol de providers.
- [src/root.tsx](src/root.tsx): bootstrap de la aplicación.
- [src/root.css](src/root.css): estilos globales mínimos.
- [src/config/mui/](src/config/mui/): palette, typography, theme y exportaciones del sistema de diseño.
- [src/config/navigation/navigation.config.ts](src/config/navigation/navigation.config.ts): `ROUTES`, `CATALOG_PARAMS`, `buildCatalogUrl`.
- [src/layouts/main/](src/layouts/main/): shell persistente con navbar, contenido y footer.
- [src/components/ui/](src/components/ui/): primitivas reutilizables (BrandIcon, CustomerAvatar, Examples).
- [src/components/book/](src/components/book/): BookCard, BookCardSkeleton, BookImage.
- [src/components/catalog/](src/components/catalog/): CatalogFilters, CatalogToolbar.
- [src/components/checkout/](src/components/checkout/): checkout-order-summary, checkout-address-picker, checkout-empty.
- [src/components/shopping-cart/](src/components/shopping-cart/): drawer, lista, ítem, vacío.
- [src/components/inputs/](src/components/inputs/): quantity-input (stepper reutilizable).
- [src/components/profile/](src/components/profile/): profile compuesto con header, form, direcciones y pedidos.
- [src/components/address/](src/components/address/): address-card, address-form, address-list, add-address-modal.
- [src/components/auth/](src/components/auth/): ProtectedRoute.
- [src/context/](src/context/): auth, shopping-cart y alert contexts con sus providers.
- [src/hooks/](src/hooks/): useAuth, useShoppingCart, useShoppingCartState, useCustomerState, useAddressState, useAlert, useCatalogSearchParams.
- [src/services/](src/services/): cliente HTTP, tipos de petición y servicios de dominio.
- [src/mocks/](src/mocks/): fixtures en memoria.
- [src/types/](src/types/): modelos y enums compartidos.
- [src/utils/](src/utils/): price.utils, shopping-cart.utils.
- [src/pages/](src/pages/): pantallas por ruta.

## Rutas

- `/` → [src/pages/landing/Landing.page.tsx](src/pages/landing/Landing.page.tsx). Landing pública. Pendiente de contenido final.
- `/login` → [src/pages/login/Login.page.tsx](src/pages/login/Login.page.tsx). Acceso. Redirige a `?redirect=` tras login.
- `/catalog` → [src/pages/catalog/Catalog.page.tsx](src/pages/catalog/Catalog.page.tsx). Catálogo completo con filtros, ordenación, paginación y skeleton loaders.
- `/book/:id` → [src/pages/book/Book.page.tsx](src/pages/book/Book.page.tsx). Ficha de libro y punto único para añadir al carrito con selector de cantidad.
- `/checkout` → [src/pages/checkout/Checkout.page.tsx](src/pages/checkout/Checkout.page.tsx). Checkout protegido con dirección y resumen de orden.
- `/profile` → [src/pages/profile/Profile.page.tsx](src/pages/profile/Profile.page.tsx). Perfil protegido con datos, direcciones y últimos pedidos.
- `/story-book` → [src/pages/story-book/StoryBook.page.tsx](src/pages/story-book/StoryBook.page.tsx). Showcase de componentes.
- `*` → [src/pages/not-found/NotFound.page.tsx](src/pages/not-found/NotFound.page.tsx). Fallback 404. Funcional.

## Contextos y Estado Global

### AuthContext (`src/context/auth/`)

Expone `user`, `isAuthenticated`, `login(credentials)` y `logout()`. `ProtectedRoute` usa este contexto para redirigir a `/login?redirect=<ruta>` si el usuario no está autenticado.

### ShoppingCartContext (`src/context/shopping-cart/`)

Expone el `cart` (mapa `bookId → CartItem`), `addItem`, `removeItem`, `updateQuantity` y `clearCart`. El estado es gestionado por `useShoppingCartState` que persiste en `localStorage` bajo la clave `relatos-de-papel.cart` y escucha el evento `storage` para sincronizar entre pestañas.

### AlertContext (`src/context/alert/`)

Expone `showAlert(message, severity)` para mostrar notificaciones tipo snackbar en cualquier parte de la app.

## Datos Y Servicios

- `USE_MOCK` se calcula desde `VITE_USE_MOCK`. Si la variable no vale `false`, la app usa los mocks locales.
- `API_URL` se calcula desde `VITE_API_URL` y por defecto apunta a `http://localhost:3000/api`.
- `apiClient` agrega `Authorization: Bearer <token>` cuando existe token y reintenta una vez si recibe `401` y hay un handler de refresh registrado.
- `booksService` cubre listado, detalle, destacados, relacionados, búsqueda, filtros y CRUD de libros.
- `customersService` cubre CRUD de clientes, login, registro, cambio de contraseña y comprobación de email.
- `ordersService` cubre listado, detalle, creación, actualización, cancelación, estadísticas y comprobación de compra previa.
- `addressesService` cubre direcciones por cliente.
- En modo mock, cada servicio mantiene un store mutable en memoria para simular persistencia durante la sesión.

### Mocks Principales

- [src/mocks/books.mock.ts](src/mocks/books.mock.ts) contiene un catálogo grande generado a partir de Open Library, con portadas, categorías, formato, año, precio, stock, rating y número de reseñas.
- [src/mocks/customer.mock.ts](src/mocks/customer.mock.ts) define usuarios de prueba.
- [src/mocks/orders.mock.ts](src/mocks/orders.mock.ts) define pedidos de ejemplo y su estado.
- [src/mocks/addresses.mock.ts](src/mocks/addresses.mock.ts) define direcciones agrupadas por `customerId`.
- [src/mocks/shopping-cart.mock.ts](src/mocks/shopping-cart.mock.ts) define un carrito inicial para desarrollo.

## Modelo De Dominio

- `Book` incluye título, autor, descripción, idioma, formato, imágenes, año, categorías, precio, stock, rating, número de reseñas, páginas, ISBN, tag opcional y marca de destacado.
- `Customer` incluye datos personales, email, contraseña, avatar y teléfono.
- `Order` incluye cliente, dirección opcional, estado, items, total y fechas.
- `Cart` es un mapa `{ [bookId]: CartItem }` donde `CartItem = { book: Book; quantity: number }`.
- `Address`, `Category`, `Tag`, `Picture` y `OrderItem` completan el contrato de datos reutilizable.
- Los tipos compartidos se exportan desde [src/types/index.ts](src/types/index.ts).

## Diseño Y UI

- La paleta vive en [src/config/mui/palette.ts](src/config/mui/palette.ts): primary navy `#1B1F3A` y secondary sand `#D9A77D`.
- La tipografía vive en [src/config/mui/typography.ts](src/config/mui/typography.ts): Inter para cuerpo y Caveat para títulos.
- El theme vive en [src/config/mui/theme.ts](src/config/mui/theme.ts) y fija `CssBaseline`, color de fondo y overrides de componentes.
- `BrandIcon` acepta `variant="primary" | "secondary"`.
- `CustomerAvatar` es el avatar reutilizable de cliente.
- `BookCard` muestra portada con fallback, metadatos, rating y botón de añadir al carrito.
- `BookCardSkeleton` es el placeholder de carga con la misma estructura que `BookCard`.
- `BookImage` renderiza la portada o un bloque de color generado deterministamente por el título del libro.
- `QuantityInput` es el stepper +/− reutilizable con `maxQuantity`.
- `CatalogFilters` y `CatalogToolbar` son los controles del catálogo; sus tipos públicos se exportan desde el barrel.
- `Navbar` contiene `CatalogAction` (búsqueda inline expansible), `AuthAction` (icono de perfil/login) y `ShoppingCartAction` (badge + drawer).

## Utilidades

- `formatPrice(amount)` — formatea a USD con `Intl.NumberFormat`.
- `readStoredCart()` / `writeStoredCart(cart)` / `clearStoredCart()` — serialización del carrito en `localStorage`.
- `buildCatalogUrl(opts)` — construye una URL de catálogo con los filtros activos.

## Contrato Funcional De La Actividad

- Landing pública.
- Login con redirección a profile tras éxito (o a `?redirect=`).
- Catálogo filtrado por título y autor, con filtros adicionales de categoría, formato, idioma y precio.
- Solo la ficha de libro puede añadir al carrito, con selector de cantidad y validación de stock.
- El carrito debe permanecer visible (navbar badge + drawer) en catalog y book views.
- Checkout protegido; al completar debe llamar a `window.alert`, vaciar el carrito y volver a `/`.
- Profile protegido; debe mostrar datos del usuario, gestión de direcciones y últimos pedidos.
- NotFound debe devolver al usuario al flujo principal.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm run lint:fix
npm run format
npm run format:check
npm run test
```

- `npm run test` ejecuta `lint-staged`, así que actúa como comprobación pre-commit.
- `npm run prepare` instala Husky.
- La CI ejecuta lint y formato, así que cualquier cambio debe dejar ambos checks limpios.

## Variables De Entorno

```bash
VITE_USE_MOCK=true
VITE_API_URL=http://localhost:3000/api
```

- Pon `VITE_USE_MOCK=false` cuando el frontend deba hablar con el backend real.
- `VITE_API_URL` debe apuntar a la API del backend Spring cuando exista.

## Flujo Recomendado Para Cambiar La App

1. Si cambia la forma de los datos, actualiza primero `src/types/*`.
2. Si el dato vive en mock, actualiza también `src/mocks/*`.
3. Si el backend entra en juego, ajusta `src/services/*` y deja las páginas finas.
4. Si el patrón visual se repite, súbelo a `src/components/ui/` o al folder de dominio correspondiente.
5. Si cambia la arquitectura, las rutas o el contrato funcional, actualiza también `README.md`, `.github/copilot-instructions.md`, `.cursorrules` y `prompts.md` en la misma iteración.

## Regla De Trabajo

- Mantén las rutas en `src/App.tsx`.
- Mantén las páginas delgadas.
- No dupliques tokens de color o tipografía fuera del theme.
- No añadas llamadas HTTP directas en páginas para evitar saltarte la capa de servicios.
- Evita `setState` síncrono directamente dentro de `useEffect`; deriva estado o usa callbacks asíncronos.
- Usa este README como guía viva: si el proyecto cambia, actualízalo junto con las instrucciones compartidas.
