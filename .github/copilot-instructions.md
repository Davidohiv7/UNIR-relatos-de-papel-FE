# Relatos de Papel Frontend Instructions

Use these instructions for all work in this workspace.

## Purpose

This repository is the React SPA for the UNIR Relatos de Papel front-end activity. Keep changes aligned with Vite + React 19 + TypeScript + MUI and with the assignment constraints for landing, login, catalog, book detail, cart, checkout, and profile.

## Working contract

- Read the nearest relevant file before editing.
- Keep changes local and minimal.
- Preserve the current architecture instead of inventing a second one.
- Use typed data and typed components.
- Reuse existing components and barrel exports before creating new files.
- Replace placeholders with real implementations instead of adding more placeholder text.
- Do not write backend code into the frontend layer.
- Create a new folder only when it has a stable responsibility.
- At the end of every AI-driven iteration, update [.github/copilot-instructions.md](.github/copilot-instructions.md), [.cursorrules](.cursorrules), [README.md](README.md), and [prompts.md](prompts.md) so the shared context and the user-facing guide stay synchronized.

## Repository map

### Root files

- [package.json](package.json), [package-lock.json](package-lock.json), [vite.config.ts](vite.config.ts), [eslint.config.js](eslint.config.js), [tsconfig.json](tsconfig.json), [tsconfig.app.json](tsconfig.app.json), and [tsconfig.node.json](tsconfig.node.json) define build, lint, and TypeScript behavior.
- [index.html](index.html) is the app shell entry point.
- [vercel.json](vercel.json) configures SPA fallback routing for Vercel deployments.
- [README.md](README.md) is the human-facing project guide for scripts, CI, and delivery expectations.
- [models.md](models.md) is the canonical domain model reference.
- [prompts.md](prompts.md) stores reusable prompts and AI context; append prompts there, do not turn it into application documentation.
- [.env.example](.env.example) is for future environment variables only.

### .github

- [.github/workflows/ci.yml](.github/workflows/ci.yml) currently runs lint and format checks only.
- [.github/copilot-instructions.md](.github/copilot-instructions.md) is the always-on workspace instruction file.

### src

Current app source. Keep routing, layout, components, state, mock data, and types here.

#### [src/App.tsx](src/App.tsx)

Single source of truth for routes and provider tree. Provider order: `ThemeProvider` → `BrowserRouter` → `AuthProvider` → `ShoppingCartProvider` → `AlertProvider` → `Routes`. `ProtectedRoute` guards `/checkout` and `/profile`. `/login` is outside `MainLayout`.

#### [src/root.tsx](src/root.tsx)

App bootstrap only. Imports fonts, global CSS, StrictMode, and mounts `App`.

#### [src/root.css](src/root.css)

Global app styles only — resets, body background, base scroll behavior. Prefer MUI theme overrides for everything else.

#### [src/config/mui/](src/config/mui/)

Design system source of truth.

- [palette.ts](src/config/mui/palette.ts): navy primary `#1B1F3A` and warm sand secondary `#D9A77D`.
- [typography.ts](src/config/mui/typography.ts): Inter body stack and Caveat heading stack.
- [theme.ts](src/config/mui/theme.ts): `createTheme` call, palette wiring, typography, shape, and component overrides.
- [index.ts](src/config/mui/index.ts): barrel export.

Never hardcode brand colors in pages when the value already belongs in the theme.

#### [src/config/navigation/navigation.config.ts](src/config/navigation/navigation.config.ts)

- `ROUTES` — all route path constants.
- `CATALOG_PARAMS` — all URL query-param keys for catalog filters (`q`, `cat`, `fmt`, `lang`, `min`, `max`, `sort`, `order`, `page`).
- `NAVIGATION_QUERY_PARAMS` — `redirect` param key for auth redirects.
- `buildCatalogUrl(opts)` — builds a typed catalog URL from optional filter options.
- Never scatter URL string literals across pages; always use these constants.

#### [src/layouts/main/](src/layouts/main/)

Persistent shell for all main app routes.

- [Main.layout.tsx](src/layouts/main/Main.layout.tsx): shared page frame with `Outlet`.
- [Navbar/Navbar.tsx](src/layouts/main/Navbar/Navbar.tsx): sticky header — brand, `CatalogAction`, `AuthAction`, `ShoppingCartAction`.
- [Footer.tsx](src/layouts/main/Footer.tsx): footer with catalog and account links.
- [Navbar/components/catalog-action/](src/layouts/main/Navbar/components/catalog-action/): expandable inline search widget.
- [Navbar/components/auth-action/](src/layouts/main/Navbar/components/auth-action/): login/profile icon and dropdown menu.
- [Navbar/components/shopping-cart-action/](src/layouts/main/Navbar/components/shopping-cart-action/): cart badge icon; opens `ShoppingCartDrawer`.
- [index.ts](src/layouts/index.ts): layout barrel export.

#### [src/components/ui/](src/components/ui/)

Reusable presentation primitives.

- [BrandIcon.tsx](src/components/ui/BrandIcon.tsx): brand mark; accepts `variant="primary" | "secondary"`.
- [Button.tsx](src/components/ui/Button.tsx): placeholder — replace with a real typed wrapper or use MUI Button directly.
- [CustomerAvatar.tsx](src/components/ui/CustomerAvatar.tsx): reusable customer avatar.
- [Examples.tsx](src/components/ui/Examples.tsx): visual showcase only.
- [index.ts](src/components/ui/index.ts): barrel export.

#### [src/components/book/](src/components/book/)

Domain components for book presentation.

- [BookCard.tsx](src/components/book/BookCard.tsx): preview card with cover, metadata, rating, price, and add-to-cart button; reads `useShoppingCart`.
- [BookCardSkeleton.tsx](src/components/book/BookCardSkeleton.tsx): loading placeholder matching `BookCard` layout.
- [book-image.tsx](src/components/book/book-image.tsx): renders cover image or seeded-color fallback with initials when URL is missing or broken.
- [index.ts](src/components/book/index.ts): barrel export.

#### [src/components/catalog/](src/components/catalog/)

Catalog-specific building blocks.

- [CatalogFilters.tsx](src/components/catalog/CatalogFilters.tsx): filter panel — title/author search, category, format, language, price range slider, and clear button.
- [CatalogToolbar.tsx](src/components/catalog/CatalogToolbar.tsx): results count label and sort-by/sort-order controls.
- [index.ts](src/components/catalog/index.ts): barrel export; also exports `CatalogFiltersValues`, `CatalogSortBy`, `CatalogSortOrder`.

#### [src/components/checkout/](src/components/checkout/)

Checkout building blocks.

- [checkout-order-summary.tsx](src/components/checkout/checkout-order-summary.tsx): cart items, total, pay button, and go-to-catalog link.
- [checkout-address-picker.tsx](src/components/checkout/checkout-address-picker.tsx): shipping address selector.
- [checkout-empty.tsx](src/components/checkout/checkout-empty.tsx): empty cart state for the checkout page.
- [index.ts](src/components/checkout/index.ts): barrel export.

#### [src/components/shopping-cart/](src/components/shopping-cart/)

Shopping cart UI.

- [shopping-cart-drawer.tsx](src/components/shopping-cart/shopping-cart-drawer.tsx): slide-in cart panel opened from the navbar.
- [shopping-cart-content.tsx](src/components/shopping-cart/shopping-cart-content.tsx): drawer body composition.
- [shopping-cart-item.tsx](src/components/shopping-cart/shopping-cart-item.tsx): single cart row with `QuantityInput` and remove button.
- [shopping-cart-list.tsx](src/components/shopping-cart/shopping-cart-list.tsx): list of all cart items.
- [shopping-cart-empty.tsx](src/components/shopping-cart/shopping-cart-empty.tsx): empty cart CTA.
- [index.ts](src/components/shopping-cart/index.ts): barrel export.

#### [src/components/inputs/](src/components/inputs/)

- [quantity-input.tsx](src/components/inputs/quantity-input.tsx): reusable +/− quantity stepper with `maxQuantity`; used in `BookCard`, `ShoppingCartItem`, and `Book.page.tsx`.

#### [src/components/profile/](src/components/profile/)

Profile composite components.

- [profile.tsx](src/components/profile/profile.tsx): top-level profile composite.
- [profile-layout.tsx](src/components/profile/profile-layout.tsx): section layout wrapper.
- [profile-header/ProfileHeader.tsx](src/components/profile/profile-header/ProfileHeader.tsx): customer avatar and name.
- [profile-item-card.tsx](src/components/profile/profile-item-card.tsx): card shell for profile sections.
- [profile-logout-button.tsx](src/components/profile/profile-logout-button.tsx): logout trigger.
- [sections/profile-form-section.tsx](src/components/profile/sections/profile-form-section.tsx): personal data editor.
- [sections/profile-address-section.tsx](src/components/profile/sections/profile-address-section.tsx): address management.
- [sections/profile-orders-section/](src/components/profile/sections/profile-orders-section/): order list and order card components.
- [index.ts](src/components/profile/index.ts): barrel export.

#### [src/components/address/](src/components/address/)

Address CRUD UI.

- [address-card.tsx](src/components/address/address-card.tsx), [address-form.tsx](src/components/address/address-form.tsx), [address-list.tsx](src/components/address/address-list.tsx), [add-address-modal.tsx](src/components/address/add-address-modal.tsx).
- [index.ts](src/components/address/index.ts): barrel export.

#### [src/components/auth/](src/components/auth/)

- [ProtectedRoute.tsx](src/components/auth/ProtectedRoute.tsx): redirects unauthenticated users to `/login?redirect=<current-path>`.
- [index.ts](src/components/auth/index.ts): barrel export.

#### [src/context/](src/context/)

Shared React context layer.

- [auth/Auth.context.tsx](src/context/auth/Auth.context.tsx) + [Auth.provider.tsx](src/context/auth/Auth.provider.tsx): auth state, login, logout, and user.
- [shopping-cart/shopping-cart.context.tsx](src/context/shopping-cart/shopping-cart.context.tsx) + [shopping-cart.provider.tsx](src/context/shopping-cart/shopping-cart.provider.tsx): cart state backed by `useShoppingCartState`.
- [alert/alert.context.tsx](src/context/alert/alert.context.tsx) + [alert.provider.tsx](src/context/alert/alert.provider.tsx): snackbar/toast system.
- [index.ts](src/context/index.ts): barrel export.

#### [src/hooks/](src/hooks/)

Custom hook layer.

- [auth/use-auth.hook.ts](src/hooks/auth/use-auth.hook.ts): consumes `AuthContext`; exposes `user`, `login`, `logout`, `isAuthenticated`.
- [shopping-cart/use-shopping-cart-state.hook.ts](src/hooks/shopping-cart/use-shopping-cart-state.hook.ts): owns cart state + localStorage sync + cross-tab sync via `storage` event.
- [shopping-cart/use-shopping-cart.hook.ts](src/hooks/shopping-cart/use-shopping-cart.hook.ts): consumes `ShoppingCartContext`.
- [customer/use-customer-state.hook.ts](src/hooks/customer/use-customer-state.hook.ts): customer data fetch and update logic.
- [address/use-address-state.hook.tsx](src/hooks/address/use-address-state.hook.tsx): address list, create, delete.
- [alert/use-alert.hook.ts](src/hooks/alert/use-alert.hook.ts): exposes `showAlert(message, severity)`.
- [catalog/use-catalog-search-params.hook.ts](src/hooks/catalog/use-catalog-search-params.hook.ts): reads and writes all catalog filter/sort/page state to the URL; depends on `BookFiltersMetadata` for price-range defaults.
- [api/use-api.hook.ts](src/hooks/api/use-api.hook.ts): incomplete placeholder — retire or implement.
- [index.ts](src/hooks/index.ts): barrel export.

#### [src/utils/](src/utils/)

- [price.utils.ts](src/utils/price.utils.ts): `formatPrice(amount)` using `Intl.NumberFormat` (USD).
- [shopping-cart.utils.ts](src/utils/shopping-cart.utils.ts): `readStoredCart`, `writeStoredCart`, `clearStoredCart` for `localStorage` key `relatos-de-papel.cart`.

#### [src/pages/](src/pages/)

Route-level screens. Keep them thin and compose reusable components.

- [landing/Landing.page.tsx](src/pages/landing/Landing.page.tsx): public entry — scaffold, pending final content.
- [login/Login.page.tsx](src/pages/login/Login.page.tsx): login form; success redirects to profile or `?redirect=` param.
- [catalog/Catalog.page.tsx](src/pages/catalog/Catalog.page.tsx): full catalog — filters, sort, pagination, skeleton loaders, debounced search; all state in the URL.
- [book/Book.page.tsx](src/pages/book/Book.page.tsx): book detail — cover, metadata, stock status, quantity selector, add-to-cart, related books grid, quick-filter links.
- [checkout/Checkout.page.tsx](src/pages/checkout/Checkout.page.tsx): protected — address picker + order summary; on success calls `window.alert`, clears cart, navigates to `/`.
- [profile/Profile.page.tsx](src/pages/profile/Profile.page.tsx): protected — profile header, personal data form, address management, last orders.
- [not-found/NotFound.page.tsx](src/pages/not-found/NotFound.page.tsx): 404 fallback with back-to-catalog CTA.
- [story-book/StoryBook.page.tsx](src/pages/story-book/StoryBook.page.tsx): UI showcase and quick visual test page.
- [index.ts](src/pages/index.ts): page barrel export.

#### [src/types/](src/types/)

Domain model and shared TypeScript types.

- [book.types.ts](src/types/book.types.ts): `Book`, `BookFormat`.
- [customer.types.ts](src/types/customer.types.ts): `Customer`.
- [order.types.ts](src/types/order.types.ts): `Order`, `OrderStatus`.
- [order-item.types.ts](src/types/order-item.types.ts): `OrderItem`.
- [cart.types.ts](src/types/cart.types.ts): `Cart`, `CartItem`.
- [category.types.ts](src/types/category.types.ts): `Category`.
- [tag.types.ts](src/types/tag.types.ts): `Tag`.
- [picture.types.ts](src/types/picture.types.ts): `Picture`.
- [index.ts](src/types/index.ts): export surface for shared types.

#### [src/services/](src/services/)

- [api/apiClient.ts](src/services/api/apiClient.ts): centralized `fetch` with `Authorization: Bearer` and single-retry on `401`.
- [config.ts](src/services/config.ts): `USE_MOCK` and `API_URL` from Vite env vars.
- [books/books.service.ts](src/services/books/books.service.ts): list, detail, featured, related, search, filters metadata, CRUD.
- [customers/customers.service.ts](src/services/customers/customers.service.ts): CRUD, login, register, password change, email check.
- [orders/orders.service.ts](src/services/orders/orders.service.ts): list, detail, create, update, cancel, stats, purchase check.
- [addresses/addresses.service.ts](src/services/addresses/addresses.service.ts): list and CRUD by `customerId`.
- [types.ts](src/services/types.ts): service-layer types including `BookFiltersMetadata`, `PaginatedResponse`.
- [http.ts](src/services/http.ts), [index.ts](src/services/index.ts): compatibility re-exports.

#### [src/mocks/](src/mocks/)

- [books.mock.ts](src/mocks/books.mock.ts): large catalog from Open Library with covers, categories, format, year, price, stock, rating.
- [customer.mock.ts](src/mocks/customer.mock.ts): test users.
- [orders.mock.ts](src/mocks/orders.mock.ts): sample orders with status.
- [addresses.mock.ts](src/mocks/addresses.mock.ts): addresses grouped by `customerId`.
- [shopping-cart.mock.ts](src/mocks/shopping-cart.mock.ts): initial cart fixture for dev/testing.

## Page and behavior contract

- Landing is public.
- Login must redirect to profile after success (or to `?redirect=` param if present).
- Catalog filters by title and author; additionally supports category, format, language, and price range; all state in URL.
- Only the book detail view may add a book to the cart, with a quantity selector and stock validation.
- Cart must remain visible (navbar badge + drawer) on catalog and book views.
- Checkout is protected; on success must call `window.alert`, clear the cart, then navigate to `/`.
- Profile is protected and must show user data, address management, and last orders.
- NotFound must route back to the app.
- StoryBook is for component verification only.

## Styling contract

- Keep the current brand palette: navy primary `#1B1F3A`, warm sand secondary `#D9A77D`, white contrast.
- Keep Inter for body text and Caveat for headings.
- Prefer MUI components, `sx`, and theme overrides over ad hoc CSS.
- Keep `src/root.css` for only global resets or truly global app-shell styling.
- Avoid generic default MUI screens; the app should feel book-themed, warm, and polished.
- If a reusable visual pattern appears more than once, promote it into `src/components/ui` or a domain component folder.

## Data and integration rules

- Use typed mock data until a backend exists.
- Do not add HTTP calls into pages as a shortcut.
- If network integration arrives later, create a dedicated `src/services/` or `src/api/` layer and keep pages thin.
- Keep search/filter logic client-side until the assignment changes.
- Cart state is persisted in `localStorage` under `relatos-de-papel.cart` and synced across tabs via the `storage` event.
- When generating large book mock sets, use Open Library Search and Covers APIs as the source, batch and cache requests, and materialize the result locally under `src/mocks/books.mock.ts` instead of fetching from pages at runtime.
- Respect Open Library usage guidance: prefer search batch requests, identify the app with a `User-Agent`, and avoid bulk-download patterns.

## Quality and validation

- Respect ESLint and Prettier; CI fails when lint or format fails.
- Avoid `any`, `console.log`, dead code, and unused exports.
- Keep components focused and easy to read.
- Avoid synchronous `setState` directly inside `useEffect`; derive state or update via async callbacks.
- Update barrels when new modules are added.
- Validate the touched slice with the narrowest useful check before widening scope.
- If a change touches a shared contract, update every consumer of that contract.
