# Agent Rules and Orientation

## Agent Boot Sequence

1. Read this file.
2. Read `package.json` to understand the project structure and available scripts.
3. Run `npm install` to install dependencies.

## Commands

- `npm run ci` — run lint, build, and test across all packages.
- `npm run lint` — lint all packages.
- `npm run build` — build all packages.
- `npm run test` — test all packages.

## Project Structure

This is an npm workspaces monorepo with packages under `libs/`.

- `libs/lang-ts/` — `@purrtrait/lang-ts` — Purrtrait language: TypeScript support via @purrception/lang-ts.
- `libs/code-renderer/` — `@purrtrait/code-renderer` — Purrtrait code layout.
- `libs/solid-code/` — `@purrtrait/solid-code` — Purrtrait renderers: SolidJS.
- `libs/view-tsx/` — `@purrtrait/view-tsx` — Abstractions for modelling editable TSX code.
- `libs/client-tsx/` — `@purrtrait/client-tsx` — In-browser TypeScript/TSX parsing and AST utilities.
