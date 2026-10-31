# Plan: Add JSDoc Renderer Package

**ID:** `add-jsdoc-renderer-package`

**Status:** `WORKING`

**Template:** `$DOMAINS/plans/templates/plan.tart`

**Has Context File:** `FALSE`

**Skill:** `write-plan`

**Purpose:** Extract the framework-free JSDoc rendering core out of `@purrtrait/solid-code` into a new zero-dependency package, drop the duplicated exports, and migrate the reference app to import the core directly.

**Description:** New `$PURRTRAIT/libs/jsdoc-renderer` package — `@purrtrait/jsdoc-renderer` — porting `createJsDocBlockRenderer` and `createJsDocLinkResolver` as pure string/record logic (no `.tsx`, no `solid-js`). `@purrtrait/solid-code` then drops the duplicated JSDoc exports (breaking, pre-1.0), and `$NO_COMPLY` is migrated to import the core directly — so Solid and Astro share one implementation imported from one place.

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

Port the JSDoc description/tags/links rendering core and the link resolver out of the Solid bindings into `@purrtrait/jsdoc-renderer`; `@purrtrait/solid-code` loses the duplicated exports, and `$NO_COMPLY` imports the core directly.

## Context

### Upstream Work

| Kind      | Path                                                                   | Role                                                    |
| --------- | ---------------------------------------------------------------------- | ------------------------------------------------------- |
| Milestone | `$ARTIFICIALS/_roadmap/3-now/milestone-art-md-hello-word/milestone.md` | Phase 4 (Docs) coordinates this plan and its consumers. |

### Knowledge

::READ `$PURRTRAIT/_guide.md` (Guide) — Package layout, setup, and verification.
::READ `$SOLID_CODE/src/controllers/JsDocBlockRenderer/createJsDocBlockRenderer.tsx` (Source) — The renderer to port.
::READ `$SOLID_CODE/src/controllers/JsDocLinkResolver/createJsDocLinkResolver.ts` (Source) — The resolver to port.
::READ `$SOLID_CODE/src/controllers/JsDocLinkResolver/private/resolveName.tsx` (Source) — The display-name helper to port.
::READ `$SOLID_CODE/src/controllers/JsDocLinkResolver/private/resolveNameAndAlias.tsx` (Source) — The alias-splitting helper to port.
::READ `$NO_COMPLY/apps/standard-ui-demo/src/providers/Rendering/private/createRenderingContext.ts` (Reference) — How the renderer is wired today.
::READ `$WORKSPACE/_guide.md` (Guide) — Workspace operations and commit conventions.

## Scope

One new package in `$PURRTRAIT`, a cleanup of the existing Solid bindings (breaking: the JSDoc factories and types leave the `@purrtrait/solid-code` surface), and an immediate migration of the `$NO_COMPLY` reference app to the new import paths. No behaviour changes — only import paths change.

### (Scope) Package: JSDoc Renderer

**Record:** `$PURRTRAIT/libs/jsdoc-renderer/_records/package.art` — New

**Role:** Owns the framework-free JSDoc rendering core.

**Changes:**

- Create the package with canonical name `@purrtrait/jsdoc-renderer`; raw TypeScript entry (`main: ./src/index.ts`), `type: module`, `sideEffects: false`, zero runtime dependencies — same packaging style as `@purrtrait/code-renderer` (`$CODE_RENDERER/package.json`); type-only imports from `@purrception/lang-ts`.
- Export `createJsDocBlockRenderer(options?)` with `description(node)`, `tags(node)`, and `links(node)` accessors over `JsDocData`: inline `{@link …}` placeholders (split on `/\{@link\s+([^}]+)\}/g`) resolved through the link resolver and serialized via `serializeLink` (default `[text](href)`), `link` tag extracted into links, all other tags returned as entries.
- Export `createJsDocLinkResolver(options?)` with an injectable `resolveLink` and a name/alias resolution (`resolveName`, `resolveNameAndAlias`) that is pure string logic.
- Export `params(node)` and `returns(node)` accessors over `FunctionJsDocData` — reading `paramTags` and `returnsTag` from function declarations — so parameter and return tag rendering is part of the core surface; absent values yield nothing.

**Partial:**

- `canonicalName` — `@purrtrait/jsdoc-renderer`
- `owner` — Project: Purrtrait
- `path` — `libs/jsdoc-renderer`

### (Scope) Package: Solid Code

**Record:** `$PURRTRAIT/libs/solid-code/_records/package.art`

**Role:** Solid-only rendering components; the JSDoc core moves out.

**Changes:**

- Delete the JSDoc renderer and resolver controllers entirely — `@purrtrait/solid-code` no longer exports `createJsDocBlockRenderer`, `createJsDocLinkResolver`, `TagItem`, `JsDocLinkItem`, or the options/API types (breaking, pre-1.0 at `0.0.12`); nothing inside `solid-code` uses them.
- No new dependency is needed: the components (`CodeBlock`, `CodeLayoutRenderer`, `SolidCodeLinkDefault`) and the `CodeLinkComponent` type are untouched and do not reference the JSDoc core.

### (Scope) Application: Standard UI Demo

**Record:** `$NO_COMPLY/apps/standard-ui-demo/_records/package.art`

**Role:** Reference app migrated to the new import paths immediately after publishing.

**Changes:**

- Add the `@purrtrait/jsdoc-renderer` dependency and bump `@purrtrait/solid-code` to the breaking release.
- Import the JSDoc factories and types from `@purrtrait/jsdoc-renderer`; keep `CodeLinkComponent` from `@purrtrait/solid-code`.

**Dependencies:**

- Iteration: Release JSDoc Renderer 0.0.1 — both packages published (`@purrtrait/jsdoc-renderer@0.0.1`, `@purrtrait/solid-code@0.0.13`).

## Execution Context

Executed from `$WORKSPACE/`. Iterations 1–3 happen in `$PURRTRAIT` on branch `main` (verification: `npm run ci` — prettier, unit tests, build via turbo); Iteration 4 happens in `$NO_COMPLY` on branch `main` (verification: `npm run ci` — lint, build, test). Iteration 3 stops at a publish gate: the worker stages the release changes and reports a blocker; the user runs `npm publish`, then tells the delegator to commit and continue.

---

## Items:

| Iteration / Instructions                                                                   | Status  |
| ------------------------------------------------------------------------------------------ | ------- |
| Iteration: Add JSDoc Renderer Package `./instructions/add-jsdoc-renderer-package.md`       | `DONE`  |
| Iteration: Drop Solid Code JSDoc Exports `./instructions/drop-solid-code-jsdoc-exports.md` | `DONE`  |
| Iteration: Release JSDoc Renderer 0.0.1 `./instructions/release-jsdoc-renderer.md`         | `READY` |
| Iteration: Update No Comply Imports `./instructions/update-no-comply-imports.md`           | `READY` |

### Iteration: Add JSDoc Renderer Package

**Id:** `add-jsdoc-renderer-package`

**Status:** `DONE`

**Purpose:** Create the zero-dependency JSDoc rendering package consumed by all renderers.

**Description:** New `$PURRTRAIT/libs/jsdoc-renderer` package with the ported block renderer and link resolver, plus the new `params`/`returns` accessors, covered by unit tests.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/add-jsdoc-renderer-package.md`

**Report:** `./instructions/add-jsdoc-renderer-package__report.md`

**Changes:**

- Scaffold `$PURRTRAIT/libs/jsdoc-renderer/` mirroring `$CODE_RENDERER`: `package.json` (`"version": "0.0.0"` placeholder, raw-TS `main: ./src/index.ts`, `type: module`, `sideEffects: false`, empty runtime `dependencies`, `@purrception/lang-ts` as the only type-only devDependency — same version as `$PURRTRAIT/libs/lang-ts/package.json` — and the same `scripts` incl. `test:ci`), `tsconfig.json`, `vite.config.ts`, `README.md`, `CHANGELOG.md` (with an `## Unreleased` section), `_records/package.art`; no `.tsx` files and no `solid-js` anywhere.
- Add the `src/index.ts` barrel and the `src/controllers/JsDocBlockRenderer/` and `src/controllers/JsDocLinkResolver/` controllers (`createJsDoc*Factory.ts`, `types.ts`, `index.ts`, `private/` helpers for the resolver) as pure `.ts`.
- Port the description accessor: split on `/\{@link\s+([^}]+)\}/g`, resolve each target through the link resolver, serialize resolved links as `[text](href)` (overridable via the `serializeLink` option), fall back to the raw target text when unresolved.
- Port the tags accessor (all `node.tags` entries except `link`) and the links accessor (each `link` tag value — string or array — resolved to `{ text, href }`, unresolved entries dropped).
- Port the link resolver with injectable `resolveLink`; port `resolveName` and `resolveNameAndAlias` as pure string helpers from `$SOLID_CODE/src/controllers/JsDocLinkResolver/private/`.
- Add the `params` / `returns` accessors over `FunctionJsDocData` (`paramTags`, `returnsTag`; absent values yield nothing).
- Add unit tests for inline link resolution (resolved and unresolved), the `serializeLink` override, tags filtering, links extraction (string and array tag values), name/alias resolution (alias, `#` fragment, `/` segment), and the params/returns accessors on a documented function node.
- Run `npm run ci` from `$PURRTRAIT` — prettier, eslint, `tsc --noEmit`, vitest with coverage, and the turbo build.

**Dependencies:**

- None.

#### Commits:

| ID                           | Repository / Checkout / Branch    | Policy   | Hash      | Status      |
| ---------------------------- | --------------------------------- | -------- | --------- | ----------- |
| `add-jsdoc-renderer-package` | Purrtrait / `$PURRTRAIT` / `main` | `NOPUSH` | `79a6883` | `COMMITTED` |

##### Commit: `add-jsdoc-renderer-package`

**Message:**

```text
build(jsdoc-renderer): Add framework-free `@purrtrait/jsdoc-renderer` package.
```

### Iteration: Drop Solid Code JSDoc Exports

**Id:** `drop-solid-code-jsdoc-exports`

**Status:** `DONE`

**Purpose:** Remove the duplicated JSDoc surface from `@purrtrait/solid-code` — a deliberate breaking change.

**Description:** Delete the renderer/resolver controllers from `solid-code`, shrinking its public surface to the Solid-only exports; no-comply is migrated in the following iteration, once published.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/drop-solid-code-jsdoc-exports.md`

**Report:** `./instructions/drop-solid-code-jsdoc-exports__report.md`

**Changes:**

- Delete `$SOLID_CODE/src/controllers/JsDocBlockRenderer/` and `$SOLID_CODE/src/controllers/JsDocLinkResolver/` — factories, types, and duplicated `private/` helpers; the only internal references are the barrel `export *` lines in `src/controllers/index.ts`.
- Keep the `export *` barrel structure so the remaining exports (`CodeBlock`, `CodeLayoutRenderer`, `CodeLinkComponent`) are unaffected.
- Breaking change: `createJsDocBlockRenderer`, `createJsDocLinkResolver`, `TagItem`, `JsDocLinkItem`, and the options/API types are no longer exported from `@purrtrait/solid-code`; consumers migrate in Iteration: Update No Comply Imports.
- Run `npm run ci` from `$PURRTRAIT`.

**Dependencies:**

- Iteration: Add JSDoc Renderer Package.

#### Commits:

| ID                              | Repository / Checkout / Branch    | Policy   | Hash      | Status      |
| ------------------------------- | --------------------------------- | -------- | --------- | ----------- |
| `drop-solid-code-jsdoc-exports` | Purrtrait / `$PURRTRAIT` / `main` | `NOPUSH` | `592a162` | `COMMITTED` |

##### Commit: `drop-solid-code-jsdoc-exports`

**Message:**

```text
refactor(solid-code): Drop JSDoc exports; core lives in `@purrtrait/jsdoc-renderer`.
```

### Iteration: Release JSDoc Renderer 0.0.1

**Id:** `release-jsdoc-renderer`

**Status:** `READY`

**Purpose:** Publish the new core and the breaking solid-code release — the only manual gate in the plan.

**Description:** Bump versions and changelogs for `@purrtrait/jsdoc-renderer` (`0.0.0` → `0.0.1`, first publish) and `@purrtrait/solid-code` (`0.0.12` → `0.0.13`), add the jsdoc-renderer npm deployment record, refresh the lockfile, then stage everything and REPORT A BLOCKER: the user runs `npm publish` for both packages, then tells the delegator to commit and continue.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/release-jsdoc-renderer.md`

**Changes:**

- Bump `$PURRTRAIT/libs/jsdoc-renderer/package.json` from `0.0.0` to `0.0.1`; convert its CHANGELOG `## Unreleased` section into the `## 0.0.1` entry.
- Bump `$PURRTRAIT/libs/solid-code/package.json` from `0.0.12` to `0.0.13`; add a `## 0.0.13` CHANGELOG entry recording the dropped JSDoc exports.
- Create `$PURRTRAIT/libs/jsdoc-renderer/_records/npm-deployment.art` mirroring `$CODE_RENDERER/_records/npm-deployment.art` (owner `Package: JSDoc Renderer`, canonical name `@purrtrait/jsdoc-renderer`, status `DEPLOYED`).
- Refresh the workspace lockfile (`npm install` from `$PURRTRAIT`) and run `npm run ci`.
- Stage all release changes and REPORT A BLOCKER — awaiting the user's `npm publish` of `@purrtrait/jsdoc-renderer` (from `$PURRTRAIT/libs/jsdoc-renderer`) and `@purrtrait/solid-code` (from `$PURRTRAIT/libs/solid-code`).
- After the user confirms both publishes succeeded: create the two commits with the blueprint messages, do NOT push, and continue.

**Dependencies:**

- Iteration: Add JSDoc Renderer Package; Iteration: Drop Solid Code JSDoc Exports.

#### Commits:

| ID                       | Repository / Checkout / Branch    | Policy     | Hash  | Status     |
| ------------------------ | --------------------------------- | ---------- | ----- | ---------- |
| `release-jsdoc-renderer` | Purrtrait / `$PURRTRAIT` / `main` | `NOCOMMIT` | (TBD) | `AUTHORED` |
| `release-solid-code`     | Purrtrait / `$PURRTRAIT` / `main` | `NOCOMMIT` | (TBD) | `AUTHORED` |

##### Commit: `release-jsdoc-renderer`

**Message:**

```text
release(jsdoc-renderer): Bump to 0.0.1 for first npm publish.

- Set version 0.0.1 and turn the CHANGELOG placeholder into the 0.0.1 entry.
- Add the npm deployment record for `@purrtrait/jsdoc-renderer`.
```

##### Commit: `release-solid-code`

**Message:**

```text
release(solid-code): Bump to 0.0.13 after dropping JSDoc exports.

- Record the dropped JSDoc exports in the CHANGELOG.
```

### Iteration: Update No Comply Imports

**Id:** `update-no-comply-imports`

**Status:** `READY`

**Purpose:** Migrate the reference app to the new import paths immediately after publishing.

**Description:** Bump the published purrtrait packages in `$NO_COMPLY/apps/standard-ui-demo` and switch the four JSDoc import sites to `@purrtrait/jsdoc-renderer`; `CodeLinkComponent` keeps coming from `@purrtrait/solid-code`.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/update-no-comply-imports.md`

**Changes:**

- Add `"@purrtrait/jsdoc-renderer"` and bump `"@purrtrait/solid-code"` in `$NO_COMPLY/apps/standard-ui-demo/package.json` to the published versions; refresh the lockfile with `npm install` from `$NO_COMPLY`.
- Switch the JSDoc imports to `@purrtrait/jsdoc-renderer`: `createJsDocBlockRenderer` / `createJsDocLinkResolver` in `$NO_COMPLY/apps/standard-ui-demo/src/providers/Rendering/private/createRenderingContext.ts`, `JsDocBlockRendererAPI` / `JsDocLinkResolverAPI` in `$NO_COMPLY/apps/standard-ui-demo/src/providers/Rendering/types.ts`, `TagItem` in `$NO_COMPLY/apps/standard-ui-demo/src/modules/code/components/CodeDocDescription/parts/CodeDocTags/CodeDocTags.tsx`, and `JsDocLinkItem` in `$NO_COMPLY/apps/standard-ui-demo/src/modules/code/components/CodeDocDescription/parts/CodeDocLinks/CodeDocLinks.tsx`.
- Keep `CodeLinkComponent` imported from `@purrtrait/solid-code` in `createRenderingContext.ts` and `$NO_COMPLY/apps/standard-ui-demo/src/providers/Rendering/RenderingProvider.tsx`.
- Run `npm run ci` from `$NO_COMPLY` — lint, build, test.

**Dependencies:**

- Iteration: Release JSDoc Renderer 0.0.1.

#### Commits:

| ID                         | Repository / Checkout / Branch    | Policy   | Hash  | Status     |
| -------------------------- | --------------------------------- | -------- | ----- | ---------- |
| `update-no-comply-imports` | No Comply / `$NO_COMPLY` / `main` | `NOPUSH` | (TBD) | `AUTHORED` |

##### Commit: `update-no-comply-imports`

**Message:**

```text
refactor(standard-ui-demo): Import JSDoc core from `@purrtrait/jsdoc-renderer`.
```

## Work

### Next

Iterations 1–2 are DONE (`79a6883`, `592a162`, both not pushed). Delegate Iteration: Release JSDoc Renderer 0.0.1 next — it stops at the publish gate: the worker prepares and stages the version bumps, changelogs, deployment record, and lockfile, then reports a blocker; the user runs `npm publish`, then tells the delegator to commit and continue. Iteration: Update No Comply Imports comes last.

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
- **Publishing automation** — no CI/CD release pipeline; Iteration: Release JSDoc Renderer 0.0.1 prepares everything (version bumps, changelogs, deployment record, lockfile) and the user's manual `npm publish` is the only step that cannot be delegated. npm authentication is the user's responsibility.

### Evidence

- **`@purrtrait/jsdoc-renderer` delivered** — commit `79a6883` on `main` (not pushed); `npm run ci` green with 18/18 tests and 96% statement coverage; all export, no-`.tsx`, and zero-dependency checks passed (details in the iteration 1 report).
- **Solid JSDoc surface dropped** — commit `592a162` on `main` (not pushed); `libs/solid-code/src/controllers/` deleted (306 lines), `@purrtrait/solid-code` now exports only `CodeBlock`, `CodeLayoutRenderer`, `CodeLinkComponent`; whole-repo CI green (details in the iteration 2 report).

### Decisions

- **Zero dependencies** — the core package depends only on types from `@purrception/lang-ts`; no framework, no components.
- **Raw TypeScript entry** — matches `code-renderer` and `lang-ts` packaging, consumable from bundlers and Astro.
- **Function param and return tags are core** — the Art MD `signature.ts` extension proved the need; the core reads `paramTags` / `returnsTag` via the existing `FunctionJsDocData` type of `@purrception/lang-ts`, so every renderer inherits them.
- **Single import path, no re-exports** — `@purrtrait/solid-code` drops the JSDoc factories and types entirely (breaking, pre-1.0 at `0.0.12`); consumers import them from `@purrtrait/jsdoc-renderer`, migrated immediately in `$NO_COMPLY`.
- **Release gate iteration** — publishing is a dedicated iteration: the worker prepares version bumps, changelogs, the deployment record, and the lockfile refresh, then stages and reports a blocker; the user's only actions are `npm publish` for both packages and telling the delegator to commit and continue.
- **Package name** — `@purrtrait/jsdoc-renderer`, keeping "renderer" consistent with `code-renderer`.

### Follow Ups

- **Purrtrait parking lot missing** — `$PURRTRAIT/_guide.md` points to `_backlog/_parking-lot.md`, which does not exist yet; create it or drop the reference (Plan: Astro Components references it too).
- Publish `@purrtrait/jsdoc-renderer` (and siblings) to npm.
- **Fix the `description` offset skip** — move `offset = index + full.length` before the fallback branches in both `$SOLID_CODE` source and the new core, then unpin the two characterization tests (details in the iteration 1 report).
- **Decide coverage thresholds for `jsdoc-renderer`** — the new package runs on vitest defaults; sibling packages configure 90/90/70/90 thresholds in `vitest.config.ts`.
- Consider moving the pure string helpers of `code-renderer` that touch links to share the same resolver contract.

### Feedback

- Verification that `createJsDocBlockRenderer` is ~90% pure string logic came from pairing analysis; the `.tsx` extension hides almost no framework coupling beyond the default link component.
- IRRELEVANT-for-delegation template gaps for the plan owner: the inline context renders only Upstream Work and Knowledge — `Required Skills`, `Domains`, `Resource Kinds in Scope`, and `Workflows` sections from `$DOMAINS/work/templates/work-item-context-section.tart` are omitted (compact shape shared with Plan: Astro Components).
- **Source offset quirk ported verbatim** (worker report) — in the `description` loop, `continue` skips the `offset` update, so an unresolved target or `serializeLink → undefined` re-emits the raw description tail; pinned by characterization tests. Fix deferred to Follow Ups.
