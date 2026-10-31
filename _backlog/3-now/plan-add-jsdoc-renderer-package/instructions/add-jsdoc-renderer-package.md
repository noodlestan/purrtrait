# Instructions: `add-jsdoc-renderer-package`

**Plan:** `add-jsdoc-renderer-package`

**Iteration Id:** `add-jsdoc-renderer-package`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-add-jsdoc-renderer-package/instructions/add-jsdoc-renderer-package__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `add-jsdoc-renderer-package`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

This section lists the path variables used in this instruction file. All file references in this instructions file MUST use these variables — never bare filesystem paths.

| Variable         | Resolved Path                    | Purpose                                        |
| ---------------- | -------------------------------- | ---------------------------------------------- |
| `$WORKSPACE`     | Current working directory        | Workspace root directory.                      |
| `$PURRTRAIT`     | `$WORKSPACE/checkouts/purrtrait` | Purrtrait monorepo — implementation target.    |
| `$SOLID_CODE`    | `$PURRTRAIT/libs/solid-code`     | Source of the JSDoc logic to port.             |
| `$CODE_RENDERER` | `$PURRTRAIT/libs/code-renderer`  | Sibling package to mirror for packaging style. |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `add-jsdoc-renderer-package`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Create `$PURRTRAIT/libs/jsdoc-renderer` — `@purrtrait/jsdoc-renderer` — a zero-dependency, framework-free package that owns the JSDoc description/tags/links rendering core and the link resolver as pure TypeScript, including the new `params` / `returns` accessors, covered by unit tests.

## Mandatory Reading

This section lists the documentation and reference files the sub-agent needs to read before making changes.

- ::READ `$PURRTRAIT/_guide.md` (Guide) — Package layout, conventions, setup, and verification. Relevant for every step.
- ::READ `$SOLID_CODE/src/controllers/JsDocBlockRenderer/createJsDocBlockRenderer.tsx` (Source) — The renderer to port. Relevant for Step 3.
- ::READ `$SOLID_CODE/src/controllers/JsDocLinkResolver/createJsDocLinkResolver.ts` (Source) — The resolver to port. Relevant for Step 4.
- ::READ `$SOLID_CODE/src/controllers/JsDocLinkResolver/private/resolveName.tsx` (Source) — The display-name helper to port. Relevant for Step 4.
- ::READ `$SOLID_CODE/src/controllers/JsDocLinkResolver/private/resolveNameAndAlias.tsx` (Source) — The alias-splitting helper to port. Relevant for Step 4.
- ::READ `$CODE_RENDERER/package.json` (Reference) — The packaging style to mirror. Relevant for Step 1.
- ::READ `$PURRTRAIT/node_modules/@noodlestan/conventions-typescript/art/index.md` (Conventions) — TypeScript conventions for all packages in this repository. Relevant for every step.
- ::READ `$PURRTRAIT/node_modules/@noodlestan/conventions-unit-tests/art/index.md` (Conventions) — Unit Test conventions. Relevant for Step 6.
- ::READ `$WORKSPACE/knowledge/conventions/writing-commit-message.art` (Conventions) — Allowed commit types, scopes, and message format. Relevant for the commit step.
- RULE: You MUST follow any links under `## Mandatory Reading` sections found in the listed files.
- RULE: If you are unable to read a file linked under `## Mandatory Reading` you must stop and REPORT A BLOCKER.

---

## Operating Instructions

### Setting Up

**Purpose:** Prepare the execution environment. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/setting-up/operation.art`.

**Instructions:** (From `$PURRTRAIT/_guide.md`)

Run from the `$PURRTRAIT` root:

```bash
npm ci # to install dependencies.
```

If it fails, resolve the issue before proceeding with implementation.

### Writing Commit Message

**Purpose:** Write standardized message according to context conventions. Operation of Workflow: Planning Work, defined in `$DOMAINS/work/workflows/planning-work/writing-commit-message/operation.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

1. Read commit message conventions from `$WORKSPACE/knowledge/conventions/writing-commit-message.art`.
2. Write the message following: the rules defined there.

### Verifying Completion

**Purpose:** Confirms that the work item has been completed and satisfies its intended outcome. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/verifying-completion/operation.art`.

**Instructions:** (From `$PURRTRAIT/_guide.md`)

Run from the `$PURRTRAIT` root:

```bash
npm run ci # lint, test and build
```

All steps MUST pass.

---

## Changes

This section summarises the changes to be made in this iteration.

- Step 1 / 8 — Scaffold the `$PURRTRAIT/libs/jsdoc-renderer/` package skeleton
- Step 2 / 8 — Add barrels and controller skeletons
- Step 3 / 8 — Port the block renderer accessors
- Step 4 / 8 — Port the link resolver and its pure helpers
- Step 5 / 8 — Add the `params` / `returns` accessors
- Step 6 / 8 — Add unit tests
- Step 7 / 8 — Install and run the purrtrait CI
- Step 8 / 8 — Commit `add-jsdoc-renderer-package`

## Steps

This section contains the detailed steps to execute, including commit steps.

### Step `1 / 8` — Scaffold the `$PURRTRAIT/libs/jsdoc-renderer/` package skeleton

Create the directory `$PURRTRAIT/libs/jsdoc-renderer/` mirroring the layout and manifest style of `$CODE_RENDERER` (read `$CODE_RENDERER/package.json` first).

Create these files:

- `$PURRTRAIT/libs/jsdoc-renderer/package.json` — copy the shape of `$CODE_RENDERER/package.json` and change:
  - `"name"`: `@purrtrait/jsdoc-renderer`
  - `"version"`: `0.0.0` — placeholder; the release iteration bumps it to `0.0.1`
  - `"description"`: `Purrtrait JSDoc rendering core.`
  - `"keywords"`: `["library", "jsdoc", "metadata", "visualization", "rendering"]`
  - `"repository"."directory"`: `libs/jsdoc-renderer`
  - keep identical: `author`, `license`, `repository.url`, `private`, `publishConfig`, `files`, `engines`, `type: "module"`, `sideEffects: false`, `main: "./src/index.ts"`, and the full `scripts` block (including `test`, `test:ci`, `test:watch`, `ci`)
  - `"dependencies"`: `{}`
  - `"devDependencies"`: `{ "@purrception/lang-ts": "<version declared in $PURRTRAIT/libs/lang-ts/package.json>" }` — type-only usage keeps runtime dependencies empty
- `$PURRTRAIT/libs/jsdoc-renderer/tsconfig.json` and `tsconfig.vite.json` — copy from `$CODE_RENDERER`.
- `$PURRTRAIT/libs/jsdoc-renderer/vite.config.ts` — copy from `$CODE_RENDERER` (it already has empty `plugins` and `alias`; no Solid plugin anywhere).
- `$PURRTRAIT/libs/jsdoc-renderer/README.md` — short: package name, one-line description pointing to the JSDoc rendering core.
- `$PURRTRAIT/libs/jsdoc-renderer/CHANGELOG.md` — exactly:

  ```md
  # CHANGELOG

  ## Unreleased

  ### Added

  - Placeholder `CHANGELOG.md`. Remove this entry when next version CHANGELOG is generated.
  ```

- `$PURRTRAIT/libs/jsdoc-renderer/_records/package.art` — mirror the record shape of `$SOLID_CODE/_records/package.art` with: canonical name `@purrtrait/jsdoc-renderer`, owner `Project: Purrtrait`, path `libs/jsdoc-renderer`.
- Copy `LICENSE-MIT`, `.npmignore`, and `.prettierignore` from `$CODE_RENDERER`.

Expected outcome: `npm -w @purrtrait/jsdoc-renderer run lint` scripts exist and the package is picked up by the `libs/*` workspace glob; no source files yet.

### Step `2 / 8` — Add barrels and controller skeletons

Create the source tree as pure `.ts` — no `.tsx`, no `solid-js`, no framework imports:

- `$PURRTRAIT/libs/jsdoc-renderer/src/index.ts` — `export * from './controllers';`
- `$PURRTRAIT/libs/jsdoc-renderer/src/controllers/index.ts` — `export * from './JsDocBlockRenderer';` and `export * from './JsDocLinkResolver';` (mirror the barrel style of `$SOLID_CODE/src/controllers/index.ts`).
- `$PURRTRAIT/libs/jsdoc-renderer/src/controllers/JsDocBlockRenderer/` — `index.ts` (barrel: `createJsDocBlockRenderer` + `types`), `types.ts`, `createJsDocBlockRenderer.ts` (empty factory placeholder returning the API object).
- `$PURRTRAIT/libs/jsdoc-renderer/src/controllers/JsDocLinkResolver/` — `index.ts` (barrel: `createJsDocLinkResolver` + `types`), `types.ts`, `createJsDocLinkResolver.ts`, `private/` with `index.ts`, `resolveName.ts`, `resolveNameAndAlias.ts`.

Move the type declarations, adapting imports to `import type { JsDocData } from '@purrception/lang-ts';`:

- `JsDocBlockRenderer/types.ts` declares `TagItem`, `JsDocBlockRendererOptions`, `JsDocBlockRendererAPI` — copy the declarations from `$SOLID_CODE/src/controllers/JsDocBlockRenderer/types.tsx` verbatim, including doc comments, importing `JsDocLinkResolverAPI` from the sibling controller.
- `JsDocLinkResolver/types.ts` declares `JsDocLinkItem`, `JsDocLinkResolverOptions`, `JsDocLinkResolverAPI` — copy from `$SOLID_CODE/src/controllers/JsDocLinkResolver/types.tsx` verbatim.

### Step `3 / 8` — Port the block renderer accessors

Implement `$PURRTRAIT/libs/jsdoc-renderer/src/controllers/JsDocBlockRenderer/createJsDocBlockRenderer.ts` from the source in `$SOLID_CODE/src/controllers/JsDocBlockRenderer/createJsDocBlockRenderer.tsx`:

- `createJsDocBlockRenderer(options: JsDocBlockRendererOptions = {}): JsDocBlockRendererAPI`
- Default `linkResolver` to `createJsDocLinkResolver()` when `options.linkResolver` is absent.
- `serializeLink(text, href)`: use `options.serializeLink` when provided, else `[text](href)`.
- `description(node)`: split on `/\{@link\s+([^}]+)\}/g`; for each match resolve the raw target through `linkResolver.resolveLink`; unresolved → push the raw target text; resolved → serialize via `serializeLink`, and when `serializeLink` returns `undefined` push the resolved display text; keep the surrounding text slicing exactly as the source.
- `tags(node)`: `Object.entries(node.tags || {}).filter(([key]) => key !== 'link')`.
- `links(node)`: read `node.tags?.['link']` (string or array), resolve each entry through `linkResolver.resolveLink`, drop unresolved entries, return `{ text, href }[]`.
- Keep the original doc comments; keep the file framework-free.

### Step `4 / 8` — Port the link resolver and its pure helpers

- Copy the bodies of `resolveName` and `resolveNameAndAlias` from `$SOLID_CODE/src/controllers/JsDocLinkResolver/private/` into `$PURRTRAIT/libs/jsdoc-renderer/src/controllers/JsDocLinkResolver/private/` verbatim (they are pure string logic; keep doc comments).
- Implement `$PURRTRAIT/libs/jsdoc-renderer/src/controllers/JsDocLinkResolver/createJsDocLinkResolver.ts` from `$SOLID_CODE/src/controllers/JsDocLinkResolver/createJsDocLinkResolver.ts`: injectable `resolveLinkName` and `resolveLink` options with the same fallbacks (`resolveName`, `text`), and the same `[displayName, href]` tuple handling. Behaviour must be identical to the source.

### Step `5 / 8` — Add the `params` / `returns` accessors

Extend the block renderer API (types + implementation) with function tag accessors typed over `FunctionJsDocData` from `@purrception/lang-ts`:

- `params: (node: FunctionJsDocData) => TagItem[]` — returns `Object.entries(node.paramTags || {})` (each `[name, description]` tuple fits `TagItem`); an absent `paramTags` yields `[]`.
- `returns: (node: FunctionJsDocData) => string | undefined` — returns `node.returnsTag`; absent yields `undefined`.
- Add both to `JsDocBlockRendererAPI` with doc comments in the style of the existing members.

### Step `6 / 8` — Add unit tests

Add co-located vitest `*.test.ts` files (vitest and vite are provided by the workspace root; no local test dependencies needed). Follow `$PURRTRAIT/node_modules/@noodlestan/conventions-unit-tests/art/index.md`. Cover at minimum:

- `createJsDocBlockRenderer.test.ts` — inline `{@link …}` resolution: resolved target becomes `[text](href)`; unresolved target falls back to the raw target text; `serializeLink` override is used; `serializeLink` returning `undefined` renders the display text as plain text; `tags` filters out `link` and keeps other entries; `links` extracts from string and array `link` tag values and drops unresolved entries.
- `createJsDocLinkResolver.test.ts` — name/alias resolution: alias wins; `#` fragment after path; last `/` segment; injected `resolveLink` returning `[displayName, href]` tuple; injected `resolveLink` returning `undefined` suppresses the link.
- `params` / `returns` — on a documented function node fixture carrying `paramTags` and `returnsTag`: `params` returns the tag entries; `returns` returns the tag string; both yield nothing when the fields are absent.

### Step `7 / 8` — Install and run the purrtrait CI

Run from the `$PURRTRAIT` root:

```bash
npm install # refresh the lockfile for the new workspace package
npm run ci
```

Fix any lint, type, test, or build failure before committing. If a failure cannot be resolved within the scope of these instructions, REPORT A BLOCKER.

---

#### Commit: `add-jsdoc-renderer-package`

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
build(jsdoc-renderer): Add framework-free `@purrtrait/jsdoc-renderer` package.
```

RULE: Commit from the `$PURRTRAIT` root on branch `main`, and stage only `$PURRTRAIT/libs/jsdoc-renderer/` and the refreshed `package-lock.json`.

RULE: The commit message MUST be used verbatim. Do not add, remove, or reword any line.

---

## Final Verification

This section describes how to confirm the iteration is completed and ready for being committed.

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy — this commit is created and NOT pushed.
- Verify that `@purrtrait/jsdoc-renderer` exports `createJsDocBlockRenderer`, `createJsDocLinkResolver`, `TagItem`, `JsDocLinkItem`, `JsDocBlockRendererOptions`, `JsDocBlockRendererAPI`, `JsDocLinkResolverOptions`, and `JsDocLinkResolverAPI`.
- Verify that no file under `$PURRTRAIT/libs/jsdoc-renderer/src/` uses a `.tsx` extension or imports `solid-js`.
- Verify that `package.json` declares no runtime `dependencies` and `main` points to `./src/index.ts`.
- Verify that the unit tests from Step 6 exist and pass.
- Verify that no file outside `$PURRTRAIT/libs/jsdoc-renderer/` and `package-lock.json` was modified.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
