# Instructions: `add-astro-code-block`

**Plan:** `astro-components`

**Iteration Id:** `add-astro-code-block`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-astro-components/instructions/add-astro-code-block__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `add-astro-code-block`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

This section lists the path variables used in this instruction file. All file references in this instructions file MUST use these variables — never bare filesystem paths.

| Variable     | Resolved Path                      | Purpose                                                     |
| ------------ | ---------------------------------- | ----------------------------------------------------------- |
| `$WORKSPACE` | Current working directory          | Workspace root directory.                                   |
| `$PURRTRAIT` | `$WORKSPACE/checkouts/purrtrait`   | Monorepo hosting the new package.                           |
| `$PACKAGE`   | `$PURRTRAIT/libs/astro-components` | New package to scaffold.                                    |
| `$MODEL`     | `$PURRTRAIT/libs/jsdoc-renderer`   | Sibling package to mirror for packaging, configs and tests. |
| `$NO_COMPLY` | `$WORKSPACE/checkouts/no-comply`   | Reference app with the Solid code block being mirrored.     |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `add-astro-code-block`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Scaffold the new `@purrtrait/astro-components` package in `$PURRTRAIT`, add the framework-free `serializeDeclaration` helper (wrapping `createCodeSerializer` + `tsCodeLayout`) with unit tests, and add `CodeBlock.astro` highlighting serialized declarations with Shiki at build time — committed as `build(astro-components): Add Astro components package with code block.`

## Mandatory Reading

This section lists the documentation and reference files the sub-agent needs to read before making changes.

- ::READ `$PURRTRAIT/_guide.md` (Guide) — Repository layout, conventions, setup, and verification. Relevant for every step.
- ::READ `$PURRTRAIT/node_modules/@noodlestan/conventions-typescript/art/index.md` (Conventions) — TypeScript conventions. Relevant for Steps 3 and 4.
- ::READ `$PURRTRAIT/node_modules/@noodlestan/conventions-unit-tests/art/index.md` (Conventions) — Unit test conventions. Relevant for Step 3.
- ::READ `$WORKSPACE/checkouts/ops/knowledge/design/manifest-policy.md` (Conventions) — Manifest pinning model: every `dependency` and `devDependency` is an exact `x.y.z`; only `peerDependencies` use caret ranges. Relevant for Step 1.
- ::READ `$WORKSPACE/knowledge/conventions/writing-commit-message.art` (Conventions) — Allowed commit types, scopes, and message format. Relevant for the commit step.
- ::READ `$MODEL/package.json` (Model) — Manifest shape to mirror: raw-TS entry, scripts, exact policy pins. Relevant for Step 1.
- ::READ `$MODEL/vite.config.ts`, `$MODEL/vitest.config.ts`, `$MODEL/tsconfig.json`, `$MODEL/tsconfig.vite.json`, `$MODEL/.npmignore`, `$MODEL/.prettierignore` (Model) — Build, test, and ignore configuration to copy. Relevant for Step 1.
- ::READ `$MODEL/_records/package.art` (Model) — Package record shape. Relevant for Step 1.
- ::READ `$PURRTRAIT/libs/code-renderer/src/controllers/serializer/createCodeSerializer.ts` (Source) — Serializer API wrapped by `serializeDeclaration`. Relevant for Step 3.
- ::READ `$NO_COMPLY/apps/standard-ui-demo/src/providers/Rendering/private/createRenderingContext.ts` (Reference) — Working wiring: `createCodeRendererOptions({ langs: [tsCodeLayout], linker })` → `createCodeSerializer(options)`. Relevant for Step 3.
- ::READ `$NO_COMPLY/apps/standard-ui-demo/src/modules/code/components/CodeBlock/CodeBlock.tsx` (Reference) — The Solid component being mirrored. Relevant for Step 4.
- ::READ `$PURRTRAIT/libs/lang-ts/src/layout/private/layoutCode.ts` (Source) — How declaration nodes are dispatched (`at` field → declaration, else expression). Relevant for Step 3 fixtures.
- ::READ `$PURRTRAIT/node_modules/@purrception/lang-ts/src/declaration/types.ts` (Source) — `Declaration` node kinds (`'type' | 'interface' | 'function' | 'component'`) used to build test fixtures. Relevant for Step 3.
- ::READ `$WORKSPACE/_guide.md` (Guide) — Workspace operations and commit conventions. Relevant for the commit step.
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
2. Write the message following the rules defined there.

### Verifying Completion

**Purpose:** Confirms that the work item has been completed and satisfies its intended outcome. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/verifying-completion/operation.art`.

**Instructions:** (From `$PURRTRAIT/_guide.md`)

Run from the `$PURRTRAIT` root:

```bash
npm run ci # lint, test and build
```

It also runs automatically on the pre-commit hook. All steps MUST pass.

---

## Changes

This section summarises the changes to be made in this iteration.

- Step 1 / 6 — Scaffold `$PACKAGE` manifest, configs, and record
- Step 2 / 6 — Register the workspace package with `npm install`
- Step 3 / 6 — Add `serializeDeclaration` helper with unit tests
- Step 4 / 6 — Add `CodeBlock.astro`
- Step 5 / 6 — Run the purrtrait CI
- Step 6 / 6 — Commit `add-astro-code-block`

## Steps

This section contains the detailed steps to execute, including commit steps.

### Step `1 / 6` — Scaffold `$PACKAGE` manifest, configs, and record

Create the package directory `$PACKAGE/` mirroring `$MODEL`, adjusted for an Astro components package:

- `$PACKAGE/package.json`:
  - `name`: `@purrtrait/astro-components`; `version`: `0.0.1`; `description`: `Purrtrait Astro components.`; `keywords`: `["library", "rendering", "astro", "documentation"]`; `repository.directory`: `libs/astro-components`; everything else (`author`, `license`, `private`, `publishConfig`, `files`, `engines`, `type`, `sideEffects`) copied from `$MODEL/package.json`.
  - `main`: `./src/index.ts`, plus an `exports` map: `"."` → `./src/index.ts` and `"./components/*"` → `./src/components/*`. The `.astro` components are reached through this exports map; they are NEVER imported from `src/index.ts` (vite and tsc cannot load `.astro` modules).
  - `scripts`: identical to `$MODEL/package.json`.
  - `dependencies` (exact pins per policy): `@purrtrait/code-renderer` `0.0.11`, `@purrtrait/lang-ts` `0.0.11`, `marked` `18.1.2`.
  - `peerDependencies`: `astro` `^7`, `shiki` `^4`.
  - `devDependencies` (exact): `@purrception/lang-ts` `0.1.1` (declaration and JSDoc node types, type-only — mirrors `$MODEL`).
- Copy from `$MODEL` verbatim, adjusting only the package-specific parts: `tsconfig.json`, `tsconfig.vite.json`, `vite.config.ts`, `vitest.config.ts` (coverage thresholds 90/70/90/90 kept), `.npmignore`, `.prettierignore`, `LICENSE-MIT`.
- `$PACKAGE/README.md` modeled on `$MODEL/README.md`, including the "Build Targets" section (packaged for bundlers such as Vite and Astro; main entry is the TypeScript source).
- `$PACKAGE/CHANGELOG.md` with an initial `## 0.0.1` entry describing the package scaffold, `CodeBlock.astro`, and the `serializeDeclaration` helper.
- `$PACKAGE/_records/package.art` modeled on `$MODEL/_records/package.art`, with: `Package: Astro Components`, `Purpose`: Astro renderers for code and JSDoc blocks, `Description`: build-time `.astro` components serializing declarations through `@purrtrait/code-renderer` and highlighting with Shiki, `Path`: `libs/astro-components/`, `Canonical Name`: `@purrtrait/astro-components`, `Published`: `false`, `Private`: `false`, `Keywords` as in the manifest, `Dependencies` listing the runtime, peer, and dev dependencies declared in the manifest, and no `Deployment` entry (publishing is a follow-up outside this plan).

Expected outcome: `$PACKAGE` contains a valid manifest and configs, but `src/` is still empty.

### Step `2 / 6` — Register the workspace package with `npm install`

Run from the `$PURRTRAIT` root:

```bash
npm install # register the new libs/* workspace package and refresh the lockfile
```

- npm auto-installs missing peers, so `astro` and `shiki` are resolved from the registry as part of this install.
- Verify `git -C $PURRTRAIT diff package-lock.json` only adds the `libs/astro-components` entry and the `astro`/`shiki` dependency subtrees; if any unrelated version changed, revert those hunks before proceeding.
- Verify the symlink exists: `test -L $PURRTRAIT/node_modules/@purrtrait/astro-components`.
- If `astro` `^7` or `shiki` `^4` cannot be resolved from the registry, REPORT A BLOCKER with the npm error.

### Step `3 / 6` — Add `serializeDeclaration` helper with unit tests

1. Create `$PACKAGE/src/lib/serializeDeclaration.ts`:

   - Export `type SerializeDeclarationOptions = { columns?: number }`.
   - Export `serializeDeclaration(nodes: object | object[], options?: SerializeDeclarationOptions): string`.
   - Implementation: build the renderer options with `createCodeRendererOptions({ langs: [tsCodeLayout], linker: () => undefined })` (no token links in v1 — see the plan's Not In Scope), then `createCodeSerializer(codeRendererOptions)`, then return `serializer.serialize(PurrceptionLanguageId, nodes).code` honouring `options?.columns` through the serializer's options parameter (`createCodeSerializer(codeRendererOptions, { columns })`).
   - RULE: the language id MUST be the `PurrceptionLanguageId` constant imported from `@purrtrait/lang-ts` (its value is `'@purrception/lang-ts'`). `computeLayout` matches it exactly against the registered `tsCodeLayout`; any other string throws `No layout registered for language`.

2. Create `$PACKAGE/src/lib/escapeHtml.ts`: export `escapeHtml(value: string): string` escaping `&`, `<`, `>`, and `"` — this is the fallback renderer used when Shiki fails.

3. Create `$PACKAGE/src/lib/index.ts` barrel exporting both modules, and make `$PACKAGE/src/index.ts` export `./lib` only. RULE: `src/index.ts` MUST NOT import any `.astro` file.

4. Create `$PACKAGE/src/lib/serializeDeclaration.test.ts` and `$PACKAGE/src/lib/escapeHtml.test.ts`, following the unit-test conventions and mirroring the style of `$MODEL/src/controllers/**/*.test.ts`:

   - Fixture A: a minimal `function` `Declaration` (with `at`, `kind: 'function'`, a name, one typed parameter, a return type, and a JSDoc block) — assert the serialized code is a non-empty string containing the function name and the `function` keyword.
   - Fixture B: a minimal `type` `Declaration` describing an object type — assert the serialized code contains the type name and braces.
   - Build fixtures as typed `Declaration` objects from `@purrception/lang-ts`; study `$PURRTRAIT/libs/lang-ts/src/layout/private/layoutCode.ts` for the dispatch contract before shaping them.
   - `escapeHtml` tests: assert `&`, `<`, `>`, `"` are escaped.

### Step `4 / 6` — Add `CodeBlock.astro`

Create `$PACKAGE/src/components/CodeBlock.astro`:

- Props: `{ lang: string; nodes: object[]; context?: object; size?: string }` — mirror the prop surface of `$NO_COMPLY/.../CodeBlock/CodeBlock.tsx`.
- Frontmatter:
  1. `const code = serializeDeclaration(props.nodes)` (the helper already pins the TypeScript layout; `props.context` is passed through as the serializer's linker context — extend the helper with a `context?: object` option if needed to keep the prop surface honest).
  2. Highlight with Shiki at build time: `const html = await codeToHtml(code, { lang: props.lang || 'ts', themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: false })` — dual theme with CSS variables so consumers control theming.
  3. Wrap the `codeToHtml` call in `try/catch`; on failure fall back to `` `<pre><code>${escapeHtml(code)}</code></pre>` ``.
- Template: render a `<div class="code-block">` wrapper carrying `data-size={props.size}` and the HTML through `set:html`.
- RULE: do not import `.astro` files from any `.ts` file.

### Step `5 / 6` — Run the purrtrait CI

Run from the `$PURRTRAIT` root:

```bash
npm run lint:fix # autofix formatting of the new files
npm run ci # lint, test and build
```

It must pass. Pay attention to: prettier formatting of the new `.md`/`.json` files, the new package's `tsc --noEmit`, and coverage thresholds on the new tests. If it fails and you cannot fix it within this iteration's scope, REPORT A BLOCKER with the failing output.

---

#### Commit: `add-astro-code-block`

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
build(astro-components): Add Astro components package with code block.
```

RULE: Commit from the `$PURRTRAIT` root on branch `main`, and stage only `$PACKAGE/**` and `$PURRTRAIT/package-lock.json`. Nothing else may be staged.

RULE: The commit message MUST be used verbatim. Do not add, remove, or reword any line.

---

## Final Verification

This section describes how to confirm the iteration is completed and ready for being committed.

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy — this commit is created and NOT pushed.
- Verify that `$PACKAGE/src/components/CodeBlock.astro` exists and `$PACKAGE/src/index.ts` contains no `.astro` import.
- Verify that `$PACKAGE/package.json` declares exact pins (`@purrtrait/code-renderer` `0.0.11`, `@purrtrait/lang-ts` `0.0.11`, `marked` `18.1.2`, `@purrception/lang-ts` `0.1.1`) and caret peers (`astro` `^7`, `shiki` `^4`), with no other dependency change.
- Verify that `serializeDeclaration` returns highlighted-ready code for both test fixtures and that `npm run test:ci` in `$PACKAGE` is green.
- Verify that `node -e "JSON.parse(require('fs').readFileSync('$PACKAGE/package.json'))"` parses and the `_records/package.art` record exists.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
