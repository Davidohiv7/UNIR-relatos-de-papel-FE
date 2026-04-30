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
- [README.md](README.md) is the human-facing project guide for scripts, CI, and delivery expectations.
- [models.md](models.md) is the canonical domain model reference for Book, BookCategory, Customer, Order, and BookOrder.
- [prompts.md](prompts.md) stores reusable prompts and AI context; append prompts there, do not turn it into application documentation.
- [.env.example](.env.example) is for future environment variables only.

Future root docs to add only when needed:

- deployment notes or a Vercel URL file.
- video-memory support notes or delivery evidence.
- small feature planning docs.
- never commit generated builds, lockfile noise, or secrets.

### .github

- [.github/workflows/ci.yml](.github/workflows/ci.yml) currently runs lint and format checks only.
- [.github/copilot-instructions.md](.github/copilot-instructions.md) is the always-on workspace instruction file.

Future .github folders:

- [.github/instructions/](.github/instructions/) for file-scoped rules.
- [.github/prompts/](.github/prompts/) for reusable prompts.
- [.github/agents/](.github/agents/) for specialized workflows.
- [.github/skills/](.github/skills/) for repeatable tool-driven tasks.
- more workflows only if they support CI, preview deploys, or release automation.

### src

Current app source. Keep routing, layout, components, state, mock data, and types here.

#### [src/App.tsx](src/App.tsx)

Single source of truth for routes. Keep all route declarations here. Public routes, protected routes, and fallback routes must be defined here, not hidden in page files.

Future scope:

- If the route table grows too large, add route helpers or guard helpers, but keep the actual route map in `App.tsx`.

#### [src/root.tsx](src/root.tsx)

App bootstrap only. It should import fonts, global CSS, StrictMode, and mount `App`.

Future scope:

- keep entry-only logic here; do not move business rules into the bootstrap file.

#### [src/root.css](src/root.css)

Global app styles only. Use it for resets, body background, base scroll behavior, and any styling that truly applies everywhere.

Future scope:

- if more global CSS is needed, stop and consider whether the style belongs in MUI theme overrides instead.

#### [src/config/mui/](src/config/mui/)

Design system source of truth.

- [palette.ts](src/config/mui/palette.ts): navy primary and warm sand secondary palette definitions only.
- [typography.ts](src/config/mui/typography.ts): Inter body stack and Caveat heading stack.
- [theme.ts](src/config/mui/theme.ts): createTheme call, palette wiring, typography, shape, and component overrides.
- [index.ts](src/config/mui/index.ts): barrel export.

Future scope:

- add component overrides, spacing tokens, or theme helper constants here if they are global.
- never hardcode brand colors in pages when the value already belongs in the theme.

#### [src/layouts/main/](src/layouts/main/)

Persistent shell for all main app routes.

- [Main.layout.tsx](src/layouts/main/Main.layout.tsx): shared page frame with `Outlet`.
- [Navbar.tsx](src/layouts/main/Navbar.tsx): sticky header, brand, search, profile, cart affordances.
- [Footer.tsx](src/layouts/main/Footer.tsx): footer, supporting links, and brand closure.
- [index.ts](src/layouts/index.ts): layout barrel export.

Future scope:

- if cart interaction becomes a drawer or persistent badge area, keep that logic in this folder or a subfolder.
- if the shell grows, split into more layout helpers before touching pages.

#### [src/components/ui/](src/components/ui/)

Reusable presentation primitives and showcase components.

- [BrandIcon.tsx](src/components/ui/BrandIcon.tsx): brand mark for header and footer.
- [Button.tsx](src/components/ui/Button.tsx): currently a minimal placeholder; if it remains, turn it into a real typed wrapper or replace it with MUI Button usage.
- [Examples.tsx](src/components/ui/Examples.tsx): visual showcase only, useful for checking MUI styles quickly.
- [index.ts](src/components/ui/index.ts): barrel export.

Future scope:

- add truly reusable primitives here: empty states, section headings, price tags, icon badges, stat cards, search fields, and small wrappers around shared MUI patterns.
- if a component is used by several pages, promote it here instead of duplicating JSX.

#### [src/components/book/](src/components/book/)

Domain components for book presentation.

- [BookCard.tsx](src/components/book/BookCard.tsx): book preview card used by catalog and showcase work.
- [index.ts](src/components/book/index.ts): barrel export.

Future scope:

- if the catalog grows, create `src/components/catalog/` for grid/filter/result-specific UI.
- if the book detail page grows, add book-gallery or book-meta helpers here instead of bloating the page.

#### [src/context/](src/context/)

Shared React context layer.

- [Auth.context.tsx](src/context/auth/Auth.context.tsx): currently a placeholder; when implemented it should provide auth state, provider, and a typed hook.
- [index.ts](src/context/index.ts): barrel export.

Future scope:

- create `auth/`, `cart/`, `search/`, or `profile/` subfolders when a context needs its own provider, hook, and types.
- keep context values typed and stable, and keep side effects out of consumers when possible.

#### [src/hooks/](src/hooks/)

Custom hook layer.

- [api/use-api.hook.ts](src/hooks/api/use-api.hook.ts): currently incomplete; replace placeholder text with a real hook or retire it once feature hooks exist.

Future scope:

- `useAuth`, `useCart`, `useDebounce`, `useLocalStorage`, `useBookSearch`, `useCheckout`, `useDocumentTitle`, and route-guard hooks belong here or in feature-specific hook folders.
- hooks should compose logic, not render UI.

#### [src/data/](src/data/)

Typed mock data and in-memory fixtures.

- currently empty.

Future scope:

- add static datasets for books, customers, orders, categories, filters, and seeded examples.
- if test data generation is needed, keep generators here or in a subfolder such as `src/data/factories/`.
- do not mix data creation with page rendering.

#### [src/pages/](src/pages/)

Route-level screens. Keep them thin and compose reusable components instead of building everything inline.

- [landing/Landing.page.tsx](src/pages/landing/Landing.page.tsx): public entry and landing content.
- [login/Login.page.tsx](src/pages/login/Login.page.tsx): login form; success redirects to profile.
- [catalog/Catalog.page.tsx](src/pages/catalog/Catalog.page.tsx): title-only search and list/grid results.
- [book/Book.page.tsx](src/pages/book/Book.page.tsx): book detail and cart entry point.
- [checkout/Checkout.page.tsx](src/pages/checkout/Checkout.page.tsx): protected checkout flow.
- [profile/Profile.page.tsx](src/pages/profile/Profile.page.tsx): protected profile and last five orders.
- [not-found/NotFound.page.tsx](src/pages/not-found/NotFound.page.tsx): 404 fallback.
- [story-book/StoryBook.page.tsx](src/pages/story-book/StoryBook.page.tsx): UI showcase and quick visual test page.
- [index.ts](src/pages/index.ts): page barrel export.

Future scope:

- if a dedicated cart route is ever required, add `src/pages/cart/Cart.page.tsx`.
- if auth or admin screens appear later, create a new page folder only when the route is stable.
- keep page files slim; push reusable UI down into `src/components` and behavior into hooks or context.

#### [src/types/](src/types/)

Domain model and shared TypeScript types.

- [book.types.ts](src/types/book.types.ts): Book, BookCategory, and BookFormat.
- [customer.types.ts](src/types/customer.types.ts): Customer.
- [order.types.ts](src/types/order.types.ts): BookOrder and Order.
- [index.ts](src/types/index.ts): export surface for shared types.

Future scope:

- add `auth.types.ts`, `cart.types.ts`, `filter.types.ts`, `ui.types.ts`, or `api.types.ts` only when those domains actually exist.
- keep types close to the feature, then export them through the barrel.

## Page and behavior contract

- Landing is public.
- Login must redirect to profile after success.
- Catalog filters by book title only for this activity.
- Only the book detail view may add a book to the cart.
- Cart must remain visible on catalog and book views.
- Checkout is protected and on success must call `window.alert`, clear the cart, then navigate to `/`.
- Profile is protected and must show user data plus the last five orders.
- NotFound must route back to the app.
- StoryBook is for component verification only.

## Styling contract

- Keep the current brand palette: navy primary, warm sand secondary, white contrast.
- Keep Inter for body text and Caveat for headings.
- Prefer MUI components, `sx`, and theme overrides over ad hoc CSS.
- Keep `src/root.css` for only global resets or truly global app-shell styling.
- Avoid generic default MUI screens; the app should feel book-themed, warm, and polished.
- If a reusable visual pattern appears more than once, promote it into `src/components/ui` or a domain component folder.

## Data and integration rules

- Use typed mock data until a backend exists.
- Do not add HTTP calls into pages as a shortcut.
- If network integration arrives later, create a dedicated `src/services/` or `src/api/` layer and keep pages thin.
- Keep search/filter logic client-side and title-only until the assignment changes.
- When generating large book mock sets, use Open Library Search and Covers APIs as the source, batch and cache requests, and materialize the result locally under `src/mocks/books.mock.ts` instead of fetching from pages at runtime.
- Respect Open Library usage guidance: prefer search batch requests, identify the app with a `User-Agent`, and avoid bulk-download patterns or hundreds of single-book requests.

## Future folders to create only when needed

- `src/components/catalog/`
- `src/components/cart/`
- `src/components/forms/`
- `src/components/profile/`
- `src/components/landing/`
- `src/components/auth/`
- `src/context/cart/`
- `src/context/search/`
- `src/hooks/useAuth.ts`
- `src/hooks/useCart.ts`
- `src/hooks/useDebounce.ts`
- `src/hooks/useLocalStorage.ts`
- `src/data/books.ts`
- `src/data/customers.ts`
- `src/data/orders.ts`
- `src/services/`
- `src/utils/`
- `src/constants/`
- `src/assets/`
- `src/test/` or `src/__tests__/`
- `.github/instructions/`, `.github/prompts/`, `.github/agents/`, `.github/skills/`

## Quality and validation

- Respect ESLint and Prettier; CI fails when lint or format fails.
- Avoid `any`, `console.log`, dead code, and unused exports.
- Keep components focused and easy to read.
- Update barrels when new modules are added.
- Validate the touched slice with the narrowest useful check before widening scope.
- If a change touches a shared contract, update every consumer of that contract.
