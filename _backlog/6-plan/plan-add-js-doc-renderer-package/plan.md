# Plan: Add JS Doc Renderer Package

**ID:** `add-js-doc-renderer-package`

**Status:** `PLANNING`

**Template:** `$DOMAINS/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Extract the framework-free JSDoc rendering core out of `@purrtrait/solid-code` into a new zero-dependency package.

**Description:** New `$PURRTRAIT/libs/js-doc-renderer` package — `@purrtrait/js-doc-renderer` — porting `createJsDocBlockRenderer` and `createJsDocLinkResolver` as pure string/record logic (no `.tsx`, no `solid-js`). `@purrtrait/solid-code` is then rewired to consume the new package while keeping its public API stable, so Solid and Astro share one implementation.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

| Variable         | Resolved Path                      | Purpose                                        |
| ---------------- | ---------------------------------- | ---------------------------------------------- |
| `$WORKSPACE`     | Current working directory          | Workspace root directory.                      |
| `$PURRTRAIT`     | `$WORKSPACE/checkouts/purrtrait`   | Purrtrait monorepo — implementation target.    |
| `$SOLID_CODE`    | `$PURRTRAIT/libs/solid-code`       | Source of the JSDoc logic to extract.          |
| `$CODE_RENDERER` | `$PURRTRAIT/libs/code-renderer`    | Sibling package to mirror for packaging style. |
| `$NO_COMPLY`     | `$WORKSPACE/checkouts/no-comply`   | Reference app consuming the renderer.          |
| `$ARTIFICIALS`   | `$WORKSPACE/checkouts/artificials` | Downstream Astro website (milestone owner).    |

## Summary

Port the JSDoc description/tags/links rendering core and the link resolver out of the Solid bindings into `@purrtrait/js-doc-renderer`, keeping `@purrtrait/solid-code` API-stable on top of it.

## Context

### Upstream Work

| Kind        | Path                                                                   | Role                                                    |
| ----------- | ---------------------------------------------------------------------- | ------------------------------------------------------- |
| Milestone   | `$ARTIFICIALS/_roadmap/3-now/milestone-art-md-hello-word/milestone.md` | Phase 4 (Docs) coordinates this plan and its consumers. |
| Parking Lot | `$PURRTRAIT/_backlog/_parking-lot.md`                                  | Purrtrait actionables and follow-ups.                   |

### Knowledge

::READ `$PURRTRAIT/_guide.md` (Guide) — Package layout, setup, and verification.
::READ `$SOLID_CODE/src/controllers/JsDocBlockRenderer/createJsDocBlockRenderer.tsx` (Source) — The renderer to port.
::READ `$SOLID_CODE/src/controllers/JsDocLinkResolver/createJsDocLinkResolver.ts` (Source) — The resolver to port.
::READ `$NO_COMPLY/apps/standard-ui-demo/src/providers/Rendering/private/createRenderingContext.ts` (Reference) — How the renderer is wired today.
::READ `$WORKSPACE/_guide.md` (Guide) — Workspace operations and commit conventions.

## Scope

One new package in `$PURRTRAIT`, plus a rewiring of the existing Solid bindings. No behaviour changes for current consumers.

### (Scope) Package: JS Doc Renderer

**Record:** `$PURRTRAIT/libs/js-doc-renderer/_records/package.art` — New

**Role:** Owns the framework-free JSDoc rendering core.

**Changes:**

- Create the package with canonical name `@purrtrait/js-doc-renderer`; raw TypeScript entry (`main: ./src/index.ts`), `sideEffects: false`, zero runtime dependencies — same packaging style as `@purrtrait/code-renderer`.
- Export `createJsDocBlockRenderer(options?)` with `description(node)`, `tags(node)`, and `links(node)` accessors over `JsDocData`: inline `{@link …}` placeholders resolved and serialized as markdown links, `link` tag extracted into links, all other tags returned as entries.
- Export `createJsDocLinkResolver(options?)` with an injectable `resolveLink` and a name/alias resolution that is pure string logic.
- Export `params(node)` and `returns(node)` accessors reading `paramTags` and `returnsTag` from function declarations, so parameter and return tag rendering is part of the core surface.

**Partial:**

- `canonicalName` — `@purrtrait/js-doc-renderer`
- `owner` — Project: Purrtrait
- `path` — `libs/js-doc-renderer`

### (Scope) Package: Solid Code

**Record:** `$PURRTRAIT/libs/solid-code/_records/package.art`

**Role:** Thin Solid bindings over the shared core.

**Changes:**

- Replace the internal JSDoc renderer and resolver implementations with imports from `@purrtrait/js-doc-renderer`.
- Keep the public API stable: `createJsDocBlockRenderer`, `createJsDocLinkResolver`, `TagItem`, `JsDocLinkItem` remain importable from `@purrtrait/solid-code`.
- Keep the Solid-only default link component in the bindings layer.

**Dependencies:**

- `@purrtrait/js-doc-renderer` must be published-or-linked within the workspace.

## Execution Context

Executed from `$WORKSPACE/`. All work happens in `$PURRTRAIT` on branch `main`. Verification runs the purrtrait pre-commit pipeline (`npm run ci`: prettier, unit tests, build via turbo).

---

## Items:

| Iteration / Instructions               | Status     |
| -------------------------------------- | ---------- |
| Iteration: Add JS Doc Renderer Package | `PLANNING` |
| Iteration: Rewire Solid Code on Core   | `PLANNING` |

### Iteration: Add JS Doc Renderer Package

**Id:** `add-js-doc-renderer-package`

**Status:** `PLANNING`

**Purpose:** Create the framework-free JSDoc rendering package.

**Description:** New `$PURRTRAIT/libs/js-doc-renderer` package with the ported block renderer and link resolver, covered by unit tests.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Changes:**

- Scaffold `$PURRTRAIT/libs/js-doc-renderer/` following sibling package conventions (`package.json` with raw-TS `main`, `sideEffects: false`, `tsconfig.json`, `README.md`, `_records/package.art`).
- Port the description accessor: split on `/\{@link\s+([^}]+)\}/g`, resolve each target through the link resolver, serialize resolved links as `[text](href)`, fall back to the raw target text when unresolved.
- Port the tags accessor (all `node.tags` entries except `link`) and the links accessor (each `link` tag value resolved to `{ text, href }`).
- Port the link resolver with injectable `resolveLink`; keep name/alias handling as pure functions (no components).
- Port the `params` / `returns` accessors over `paramTags` / `returnsTag` (absent values yield nothing).
- Add unit tests for inline link resolution (resolved and unresolved), tags filtering, links extraction, the `serializeLink` override, and the params/returns accessors on a documented function node.
- Run `npm run ci` from `$PURRTRAIT`.

**Dependencies:**

- None.

#### Commits:

| ID                            | Repository / Checkout / Branch    | Policy   | Hash  | Status     |
| ----------------------------- | --------------------------------- | -------- | ----- | ---------- |
| `add-js-doc-renderer-package` | Purrtrait / `$PURRTRAIT` / `main` | `NOPUSH` | (TBD) | `AUTHORED` |

##### Commit: `add-js-doc-renderer-package`

**Message:**

```text
build(js-doc-renderer): Add framework-free js doc renderer package.
```

### Iteration: Rewire Solid Code on Core

**Id:** `rewire-solid-code-on-core`

**Status:** `PLANNING`

**Purpose:** Make `@purrtrait/solid-code` consume the shared core without API changes.

**Description:** Remove the duplicated renderer/resolver logic from `solid-code`, depend on `@purrtrait/js-doc-renderer`, and keep every existing import path working.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Changes:**

- Add `@purrtrait/js-doc-renderer` as a dependency of `$SOLID_CODE`.
- Replace `solid-code`'s JSDoc renderer and resolver internals with the imported core; re-export `createJsDocBlockRenderer`, `createJsDocLinkResolver`, `TagItem`, and `JsDocLinkItem` so consumers see no difference.
- Keep the Solid default link component (`SolidCodeLinkDefault`) and the `CodeBlock`/`CodeLayoutRenderer` components untouched.
- Verify the `$NO_COMPLY` wiring pattern (`createJsDocLinkResolver({ resolveLink })` → `createJsDocBlockRenderer({ linkResolver })`) still type-checks against the new implementation.
- Run `npm run ci` from `$PURRTRAIT`.

**Dependencies:**

- Iteration: Add JS Doc Renderer Package.

#### Commits:

| ID                          | Repository / Checkout / Branch    | Policy   | Hash  | Status     |
| --------------------------- | --------------------------------- | -------- | ----- | ---------- |
| `rewire-solid-code-on-core` | Purrtrait / `$PURRTRAIT` / `main` | `NOPUSH` | (TBD) | `AUTHORED` |

##### Commit: `rewire-solid-code-on-core`

**Message:**

```text
refactor(solid-code): Consume js doc renderer package.
```

## Work

### Next

Draft the remaining iteration details or write instructions for Iteration: Add JS Doc Renderer Package, then delegate.

### Blockers

- None.

---

## Operating Instructions

### Setting Up

**Purpose:** Prepare the execution environment.

**Instructions:** (From `$PURRTRAIT/_guide.md`)

Run from the `$PURRTRAIT` root:

```bash
npm ci
```

### Writing Commit Message

**Purpose:** Write standardized message according to context conventions.

**Instructions:** (From `$WORKSPACE/_guide.md`)

1. Read commit message conventions from `$WORKSPACE/knowledge/conventions/writing-commit-message.art`.
2. Write the commit message following the rules defined there.

### Verifying Completion

**Purpose:** Confirms lint, tests, and build pass.

**Instructions:** (From `$PURRTRAIT/_guide.md`)

Run from the `$PURRTRAIT` root:

```bash
npm run ci
```

---

## Coordination

### Not In Scope

- **Astro components** — the Astro renderers are planned separately in Plan: Astro Components.
- **`@purrtrait/code-renderer` changes** — the code serializer is consumed as-is.
- **No Comply migration** — the reference app keeps its current imports.
- **Publishing** — no npm release in this plan.

### Evidence

- None yet.

### Decisions

- **Zero dependencies** — the core package depends only on types from `@purrception/lang-ts`; no framework, no components.
- **Raw TypeScript entry** — matches `code-renderer` and `lang-ts` packaging, consumable from bundlers and Astro.
- **Function param and return tags are core** — the Art MD `signature.ts` extension proved the need; the core owns `paramTags` / `returnsTag` so every renderer inherits them.
- **Stable Solid API** — `solid-code` re-exports the core so `$NO_COMPLY` needs no changes.
- **Package name** — `@purrtrait/js-doc-renderer`, keeping "renderer" consistent with `code-renderer`.

### Follow Ups

- Publish `@purrtrait/js-doc-renderer` (and siblings) to npm.
- Consider moving the pure string helpers of `code-renderer` that touch links to share the same resolver contract.

### Feedback

- Verification that `createJsDocBlockRenderer` is ~90% pure string logic came from pairing analysis; the `.tsx` extension hides almost no framework coupling beyond the default link component.
