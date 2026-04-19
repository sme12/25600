## Monorepo

- npm workspaces + Turborepo. Root scripts: `build`, `deploy` (builds all + `scripts/assemble.js` into `dist/`), `lint:all`, `format:all`.
- Each study lives in a numbered workspace (e.g. [01-clerk-nav/](01-clerk-nav/), [02-linear-issues/](02-linear-issues/)) and is deployed as a sub-path of `25600.design` (Vite `base: '/<workspace>/'`).
- Run a workspace dev server with `npm run dev -w <workspace>`.
- Shared root configs: [tsconfig.base.json](tsconfig.base.json), [eslint.config.js](eslint.config.js) (root-level, used by legacy workspaces), [.prettierrc](.prettierrc) (singleQuote, tabWidth 2, trailingComma es5, lf, `prettier-plugin-css-order`).
- Premise: recreate exceptional UI from design-engineering-forward companies in fine detail. See [README.md](README.md).

## 02-linear-issues

- Goal: recreate the Linear issues list view.
- Stack: React 19, TanStack Router (file-based routes, auto code-splitting, `routeTree.gen.ts` is generated — do not edit), TanStack Hotkeys, Base UI (`@base-ui/react`), Tailwind CSS v4 (Vite plugin, CSS-first config in [src/styles.css](02-linear-issues/src/styles.css)), Inter Variable via `@fontsource-variable/inter`, Vite 8, TypeScript strict.
- ESLint: extends `@tanstack/eslint-config` — **not** the root config. See [02-linear-issues/eslint.config.js](02-linear-issues/eslint.config.js).
- Path aliases: `#/*` and `@/*` both map to `./src/*` (tsconfig + package `imports`).
- Theming: light/dark via `.dark` class on `<html>`. Tokens declared in `@theme` / `.dark` blocks in [src/styles.css](02-linear-issues/src/styles.css) (LCH-based backgrounds, hex text/borders). Toggle helpers in [src/lib/theme.ts](02-linear-issues/src/lib/theme.ts).
- Class merging: always use `cn` from [src/lib/utils.ts](02-linear-issues/src/lib/utils.ts) (`twMerge(clsx(...))`).
- Components live under [src/components/](02-linear-issues/src/components/); routes under [src/routes/](02-linear-issues/src/routes/) with `__root.tsx` owning the app shell (sidebar + main panel + devtools).
- Devtools: `TanStackDevtools` wraps Router + Hotkeys panels in `__root.tsx`.

## Plan Mode

- Make the plan extremely concise. Sacrifice grammar for the sake of concision.
- At the end of each plan, give me a list of unresolved questions to answer, if any.
- Do not add build verification steps to the plan. I will ask you to generate code after you have given me the plan, and I will verify the code myself.

## Linting

- Use `eslint` for linting TypeScript code.
- Use `prettier` for code formatting.
