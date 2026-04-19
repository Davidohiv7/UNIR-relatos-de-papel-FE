Normalmente los README.md van en ingles, lo podemos pasar a español, pero debemos revisarlo

# Relatos de Papel — Frontend

Frontend SPA for the Relatos de Papel web application, built as part of the UNIR Full Stack Web Development master's program.

## Tech Stack

- **Vite** — build tool and dev server
- **React 19** — UI library with functional components and hooks
- **TypeScript** — static typing
- **React Router v7** — client-side routing in declarative mode

## Code Quality

- **ESLint** — static analysis with TypeScript, React Hooks and React Refresh rules
- **Prettier** — automatic code formatting
- Enforced on every PR via GitHub Actions CI — **PRs with lint or formatting errors cannot be merged**

## Styling

To be defined.

## Getting Started

```bash
npm install
npm run dev
```

## Before Pushing

The CI pipeline runs ESLint and Prettier on every PR to `main` and will block merging if any check fails. Always run the following before pushing your branch:

```bash
npm run lint:fix      # auto-fixes ESLint issues where possible
npm run format        # auto-formats all files with Prettier
```

Then check if anything remains that could not be auto-fixed:

```bash
npm run lint          # should return no errors
npm run format:check  # should return no errors
```

If `lint` still reports errors after `lint:fix`, those require manual fixes — ESLint will point to the exact file, line, and rule that is failing. Read the error message, go to that line, and fix the issue. Common examples:

- `no-console` — remove any `console.log` calls left from debugging
- `no-explicit-any` — replace `any` with a proper TypeScript type
- `no-unused-vars` — remove variables that are declared but never used

If `format:check` still reports errors after running `format`, it likely means a file was saved after formatting. Just run `format` again.

## Available Scripts

```bash
npm run lint          # run ESLint
npm run lint:fix      # run ESLint and auto-fix
npm run format        # run Prettier across all files
npm run format:check  # check formatting without writing changes
```
