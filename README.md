# Relatos de Papel — Frontend

Relatos de Papel es la SPA en React del proyecto transversal del máster UNIR. Este repositorio concentra la estructura de rutas, el shell visual, el sistema de diseño con MUI, el modelo de dominio tipado, la capa de servicios y los mocks locales que sostienen el catálogo y las funcionalidades futuras de autenticación, carrito, checkout y perfil.

## Resumen Rápido

- Vite arranca la app y sirve como entorno de desarrollo y build.
- React 19 + TypeScript se usan para construir la UI con componentes funcionales y tipos compartidos.
- React Router v7 define las rutas declarativas.
- MUI centraliza el diseño visual, la paleta y la tipografía.
- La app funciona en modo mock por defecto y puede apuntar a un backend real mediante variables de entorno.
- El README está pensado como guía operativa para entender cómo está montado el proyecto y dónde tocar cada parte.

## Cómo Se Ejecuta La App

1. `src/root.tsx` carga las fuentes globales, `src/root.css` y monta `<App />`.
2. `src/App.tsx` aplica `ThemeProvider` y `CssBaseline`, y declara todas las rutas.
3. `src/layouts/main/Main.layout.tsx` envuelve las rutas principales con navbar, `Outlet` y footer.
4. Las páginas de `src/pages/*` permanecen delgadas y actúan como puntos de entrada por ruta.
5. `src/services/api/apiClient.ts` centraliza `fetch`, el manejo del token y el reintento en `401`.
6. Los servicios de `src/services/*` eligen entre mock local o API real con `USE_MOCK`.
7. `src/mocks/*` contiene los datos locales de libros, clientes, pedidos y direcciones.
8. `src/types/*` define el contrato común entre UI, servicios y mocks.

## Estado Actual Del Proyecto

- El shell visual ya está montado y funciona alrededor de las rutas principales.
- `StoryBook` y `NotFound` tienen contenido real.
- Las páginas de negocio (`landing`, `login`, `catalog`, `book`, `checkout`, `profile`) siguen en modo scaffold y sirven como base para la implementación funcional.
- El navbar ya muestra accesos visuales para búsqueda, perfil y carrito, pero todavía no están conectados a un flujo interactivo completo.
- No existe una ruta dedicada `/cart` en este momento; el carrito se resolverá más adelante desde la shell o mediante contexto compartido.

## Mapa Del Proyecto

- [src/App.tsx](src/App.tsx): fuente única de verdad para las rutas.
- [src/root.tsx](src/root.tsx): bootstrap de la aplicación.
- [src/root.css](src/root.css): estilos globales mínimos.
- [src/config/mui/](src/config/mui/): palette, typography, theme y exportaciones del sistema de diseño.
- [src/layouts/main/](src/layouts/main/): shell persistente con navbar, contenido y footer.
- [src/components/ui/](src/components/ui/): primitivas reutilizables y showcase de MUI.
- [src/components/book/](src/components/book/): componentes de presentación para libros.
- [src/services/](src/services/): cliente HTTP, tipos de petición y servicios de dominio.
- [src/mocks/](src/mocks/): fixtures en memoria.
- [src/types/](src/types/): modelos y enums compartidos.
- [src/pages/](src/pages/): pantallas por ruta.

## Rutas

- `/` -> [src/pages/landing/Landing.page.tsx](src/pages/landing/Landing.page.tsx). Landing pública. Actualmente es scaffold.
- `/login` -> [src/pages/login/Login.page.tsx](src/pages/login/Login.page.tsx). Acceso. Actualmente es scaffold.
- `/catalog` -> [src/pages/catalog/Catalog.page.tsx](src/pages/catalog/Catalog.page.tsx). Catálogo con búsqueda por título. Actualmente es scaffold.
- `/book/:id` -> [src/pages/book/Book.page.tsx](src/pages/book/Book.page.tsx). Ficha de libro y punto único para añadir al carrito. Actualmente es scaffold.
- `/checkout` -> [src/pages/checkout/Checkout.page.tsx](src/pages/checkout/Checkout.page.tsx). Checkout protegido. Actualmente es scaffold.
- `/profile` -> [src/pages/profile/Profile.page.tsx](src/pages/profile/Profile.page.tsx). Perfil protegido y últimos pedidos. Actualmente es scaffold.
- `/story-book` -> [src/pages/story-book/StoryBook.page.tsx](src/pages/story-book/StoryBook.page.tsx). Vista de verificación de componentes. Funciona.
- `*` -> [src/pages/not-found/NotFound.page.tsx](src/pages/not-found/NotFound.page.tsx). Fallback 404. Funciona.

## Datos Y Servicios

- `USE_MOCK` se calcula desde `VITE_USE_MOCK`. Si la variable no vale `false`, la app usa los mocks locales.
- `API_URL` se calcula desde `VITE_API_URL` y por defecto apunta a `http://localhost:3000/api`.
- `apiClient` agrega `Authorization: Bearer <token>` cuando existe token y reintenta una vez si recibe `401` y hay un handler de refresh registrado.
- `booksService` cubre listado, detalle, destacados, relacionados, búsqueda, filtros y CRUD de libros.
- `customersService` cubre CRUD de clientes, login, registro, cambio de contraseña y comprobación de email.
- `ordersService` cubre listado, detalle, creación, actualización, cancelación, estadísticas y comprobación de compra previa.
- `addressesService` cubre direcciones por cliente.
- En modo mock, cada servicio mantiene un store mutable en memoria para simular persistencia durante la sesión.
- `src/services/http.ts` y `src/services/index.ts` actúan como puntos de compatibilidad y exportación.

### Mocks Principales

- [src/mocks/books.mock.ts](src/mocks/books.mock.ts) contiene un catálogo grande generado a partir de Open Library, con portadas, categorías, formato, año, precio, stock, rating y número de reseñas.
- [src/mocks/customer.mock.ts](src/mocks/customer.mock.ts) define usuarios de prueba.
- [src/mocks/orders.mock.ts](src/mocks/orders.mock.ts) define pedidos de ejemplo y su estado.
- [src/mocks/addresses.mock.ts](src/mocks/addresses.mock.ts) define direcciones agrupadas por `customerId`.
- Cuando regeneres el catálogo, usa Open Library Search y Covers API en batch, cachea el resultado y persiste la instantánea en los mocks locales. No hagas fetch directo desde las páginas.

## Modelo De Dominio

- `Book` incluye título, autor, descripción, idioma, formato, imágenes, año, categorías, precio, stock, rating, número de reseñas, páginas, ISBN, tag opcional y marca de destacado.
- `Customer` incluye datos personales, email, contraseña, avatar y teléfono.
- `Order` incluye cliente, dirección opcional, estado, items, total y fechas.
- `Address`, `Category`, `Tag`, `Picture` y `OrderItem` completan el contrato de datos reutilizable.
- Los tipos compartidos se exportan desde [src/types/index.ts](src/types/index.ts).

## Diseño Y UI

- La paleta vive en [src/config/mui/palette.ts](src/config/mui/palette.ts): primary navy `#1B1F3A` y secondary sand `#D9A77D`.
- La tipografía vive en [src/config/mui/typography.ts](src/config/mui/typography.ts): Inter para cuerpo y Caveat para títulos.
- El theme vive en [src/config/mui/theme.ts](src/config/mui/theme.ts) y además fija `CssBaseline`, color de fondo y algunos overrides.
- [src/root.css](src/root.css) debe quedarse casi vacío; los estilos globales reales viven en el theme o en `sx`.
- `BrandIcon` es el icono de marca reutilizable.
- `Examples` es la página de verificación visual de MUI.
- `Button` todavía es un placeholder; usa el `Button` de MUI directamente hasta que ese wrapper se sustituya por una implementación real.
- `BookCard` es el componente base para previews de libros.
- `Navbar` y `Footer` forman parte del shell persistente y no de una página concreta.

## Contrato Funcional De La Actividad

Este es el flujo objetivo que guía la implementación de las páginas que todavía están en scaffold:

- Landing pública.
- Login con redirección a profile tras éxito.
- Catálogo filtrado por título de libro.
- Solo la ficha de libro puede añadir al carrito.
- El carrito debe permanecer visible en catalog y book.
- Checkout protegido; al completar debe llamar a `window.alert`, vaciar el carrito y volver a `/`.
- Profile protegido; debe mostrar datos del usuario y los últimos cinco pedidos.
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
- Usa este README como guía viva: si el proyecto cambia, actualízalo junto con las instrucciones compartidas.
