# Plan: Astro Components

**ID:** `astro-components`

**Status:** `PLANNING`

**Template:** `$DOMAINS/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Add Astro renderers reusing the Purrtrait rendering core: a build-time code block with Shiki and a JSDoc block with descriptions, tags, and links.

**Description:** New `$PURRTRAIT/libs/astro-components` package — `@purrtrait/astro-components` — with `.astro` components: `CodeBlock.astro` (declaration nodes → serialized code → Shiki-highlighted HTML at build time) and `JsDocBlock.astro` (description, tags, links from `@purrtrait/js-doc-renderer`, descriptions rendered as markdown). Peer dependencies on `astro` and `shiki`; no Solid anywhere.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

| Variable           | Resolved Path                                      | Purpose                                           |
| ------------------ | -------------------------------------------------- | ------------------------------------------------- |
| `$WORKSPACE`       | Current working directory                          | Workspace root directory.                         |
| `$PURRTRAIT`       | `$WORKSPACE/checkouts/purrtrait`                   | Purrtrait monorepo — implementation target.       |
| `$CODE_RENDERER`   | `$PURRTRAIT/libs/code-renderer`                    | Framework-free serializer consumed by CodeBlock.  |
| `$JS_DOC_RENDERER` | `$PURRTRAIT/libs/js-doc-renderer`                  | Framework-free JSDoc core consumed by JsDocBlock. |
| `$NO_COMPLY`       | `$WORKSPACE/checkouts/no-comply`                   | Reference components and wiring.                  |
| `$ART_MD_WEB`      | `$WORKSPACE/checkouts/artificials/apps/art-md-web` | Consuming app; end-to-end validation.             |
| `$ARTIFICIALS`     | `$WORKSPACE/checkouts/artificials`                 | Downstream project (milestone owner).             |

## Summary

Provide the Astro-native rendering layer for the Purrtrait stack so static docs sites get the same code and JSDoc granularity as the SolidJS reference, entirely at build time.

## Context

### Upstream Work

| Kind        | Path                                                                   | Role                                                    |
| ----------- | ---------------------------------------------------------------------- | ------------------------------------------------------- |
| Milestone   | `$ARTIFICIALS/_roadmap/3-now/milestone-art-md-hello-word/milestone.md` | Phase 4 (Docs) coordinates this plan and its consumers. |
| Parking Lot | `$PURRTRAIT/_backlog/_parking-lot.md`                                  | Purrtrait actionables and follow-ups.                   |

### Knowledge

::READ `$PURRTRAIT/_guide.md` (Guide) — Package layout, setup, and verification.
::READ `$CODE_RENDERER/src/controllers/serializer/createCodeSerializer.ts` (Source) — Serializer API consumed by `CodeBlock.astro`.
::READ `$NO_COMPLY/apps/standard-ui-demo/src/modules/code/components/CodeBlock/CodeBlock.tsx` (Reference) — The Solid component being mirrored.
::READ `$NO_COMPLY/apps/standard-ui-demo/src/modules/code/components/CodeDocDescription/CodeDocDescription.tsx` (Reference) — The description/tags/links block being mirrored.
::READ `$NO_COMPLY/apps/standard-ui-demo/src/modules/code/components/CodeDocDescription/parts/CodeDocBody/CodeDocBody.tsx` (Reference) — Verifies descriptions render as plain text today; Astro renders markdown instead.
::READ `$WORKSPACE/_guide.md` (Guide) — Workspace operations and commit conventions.

## Scope

One new package in `$PURRTRAIT`. The consuming website work is planned separately in Plan: Integrate Purrtrait and Shiki.

### (Scope) Package: Astro Components

**Record:** `$PURRTRAIT/libs/astro-components/_records/package.art` — New

**Role:** Owns the Astro renderers for code and JSDoc blocks.

**Changes:**

- Create the package with canonical name `@purrtrait/astro-components`; `.astro` components exported alongside a TypeScript helper barrel.
- `CodeBlock.astro` — props `{ lang, nodes, context?, size? }`; serializes declaration nodes through `@purrtrait/code-renderer` (`createCodeSerializer` + `tsCodeLayout` from `@purrtrait/lang-ts`), highlights the resulting code with Shiki at build time (`codeToHtml`), and renders the HTML.
- `JsDocBlock.astro` — props `{ jsdoc, title?, resolveLink? }` plus a default slot; renders the full docs surface the ported ApiScreen sections need: description (markdown → HTML via `marked`), tags list (`tag: value`), links list, and function parameter/return entries from `paramTags` / `returnsTag` — all from `@purrtrait/js-doc-renderer`.
- Peer dependencies: `astro` `^7`, `shiki` `^4`; dependencies: `@purrtrait/code-renderer`, `@purrtrait/js-doc-renderer`, `@purrtrait/lang-ts`, `marked`.

**Partial:**

- `canonicalName` — `@purrtrait/astro-components`
- `owner` — Project: Purrtrait
- `path` — `libs/astro-components`

## Execution Context

Executed from `$WORKSPACE/`. All work happens in `$PURRTRAIT` on branch `main`. Verification runs the purrtrait pre-commit pipeline (`npm run ci`); end-to-end rendering is validated through the consuming website in a separate plan.

---

## Items:

| Iteration / Instructions          | Status     |
| --------------------------------- | ---------- |
| Iteration: Add Astro Code Block   | `PLANNING` |
| Iteration: Add Astro Js Doc Block | `PLANNING` |

### Iteration: Add Astro Code Block

**Id:** `add-astro-code-block`

**Status:** `PLANNING`

**Purpose:** Ship the package scaffold and the build-time code renderer.

**Description:** New `$PURRTRAIT/libs/astro-components` package with `CodeBlock.astro` serializing declaration nodes and highlighting with Shiki at build time.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Changes:**

- Scaffold `$PURRTRAIT/libs/astro-components/` following sibling package conventions (`package.json` with raw-TS entry and an exports map covering `.astro` components, `tsconfig.json`, `README.md`, `_records/package.art`).
- Add a framework-free helper `serializeDeclaration(nodes, options?)` in `src/lib/` that wraps `createCodeSerializer` + `tsCodeLayout` and returns the code string; unit-test it with a function declaration node and an object type node.
- Add `src/components/CodeBlock.astro`: call the helper in frontmatter, highlight with Shiki (`codeToHtml`, `lang: 'ts'`), and render the result; degrade to an escaped `<pre><code>` block when highlighting fails.
- Declare `astro` `^7` and `shiki` `^4` as peer dependencies; `@purrtrait/code-renderer`, `@purrtrait/lang-ts`, and `marked` as dependencies.
- Run `npm run ci` from `$PURRTRAIT`.

**Dependencies:**

- None.

#### Commits:

| ID                     | Repository / Checkout / Branch    | Policy   | Hash  | Status     |
| ---------------------- | --------------------------------- | -------- | ----- | ---------- |
| `add-astro-code-block` | Purrtrait / `$PURRTRAIT` / `main` | `NOPUSH` | (TBD) | `AUTHORED` |

##### Commit: `add-astro-code-block`

**Message:**

```text
build(astro-components): Add Astro components package with code block.
```

### Iteration: Add Astro Js Doc Block

**Id:** `add-astro-js-doc-block`

**Status:** `PLANNING`

**Purpose:** Render descriptions, tags, and links in Astro with the shared core.

**Description:** Add `JsDocBlock.astro` on top of `@purrtrait/js-doc-renderer`, with markdown descriptions and injectable link resolution.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Changes:**

- Add `@purrtrait/js-doc-renderer` as a dependency of `$PURRTRAIT/libs/astro-components`.
- Add `src/components/JsDocBlock.astro`: props `{ jsdoc: JsDocData; title?: string; resolveLink?: (target: string) => { text: string; href: string } | undefined }`; build the renderer in frontmatter with the injected `resolveLink`; render description, tags, links, and — for function nodes — the `paramTags` / `returnsTag` entries; render nothing when all are absent.
- Coverage rule: any tag, description, param, or member-description rendering gap found while porting the ApiScreen sections is closed here (or in `js-doc-renderer`), never in a consumer app.
- Render the description as markdown to HTML with `marked` so resolver links (`[text](href)`) become real anchors.
- Add `src/components/Tags.astro` rendering `tag: value` entries, and a links list section; export all components from the package barrel.
- Run `npm run ci` from `$PURRTRAIT`.

**Dependencies:**

- Iteration: Add JS Doc Renderer Package (Plan: Add JS Doc Renderer Package).

#### Commits:

| ID                       | Repository / Checkout / Branch    | Policy   | Hash  | Status     |
| ------------------------ | --------------------------------- | -------- | ----- | ---------- |
| `add-astro-js-doc-block` | Purrtrait / `$PURRTRAIT` / `main` | `NOPUSH` | (TBD) | `AUTHORED` |

##### Commit: `add-astro-js-doc-block`

**Message:**

```text
build(astro-components): Add js doc block component.
```

## Work

### Next

Write instructions for Iteration: Add Astro Code Block (unblocked), then delegate. Iteration: Add Astro Js Doc Block waits for Plan: Add JS Doc Renderer Package.

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

- **In-code symbol links** — token-level links inside serialized code (the `linker` path of `code-renderer`) are deferred to a follow-up; v1 renders highlighted code without anchors.
- **Astro integration (config hooks)** — this is a components package, not an `astro.config` integration.
- **Website integration** — consuming the components is planned in Plan: Integrate Purrtrait and Shiki.
- **Publishing** — no npm release in this plan.

### Evidence

- None yet.

### Decisions

- **Components package, not integration** — Astro "integrations" are config hooks; the `.astro` components are consumed directly by pages.
- **Shiki at build time** — replaces the runtime `@purrpose/solid-shiki-service` resource; static output needs no async resource.
- **Markdown descriptions** — the Solid reference renders descriptions as plain text (verified: `CodeDocBody` → `Text`, no markdown pass anywhere); Astro renders markdown so `[text](href)` links from the resolver become real anchors.
- **Full docs surface owned here** — description, tags, links, and param/returns entries live in this package (or `js-doc-renderer`); consumer apps render member descriptions from node data, never through local helpers.
- **`resolveLink` injected as a prop** — keeps the package decoupled from any meta service; callers pass their own resolver.
- **No token links in v1** — keeps Shiki output simple; `code-renderer`'s linker support stays available for a follow-up.

### Follow Ups

- Decide whether object member descriptions render as comments inside serialized declarations — a `@purrtrait/code-renderer` capability; consumers render them from node data meanwhile.
- Render in-code symbol links (linker tokens → `<a>`) once the website's route contract is stable.
- Publish `@purrtrait/astro-components` to npm.

### Feedback

- None yet.
