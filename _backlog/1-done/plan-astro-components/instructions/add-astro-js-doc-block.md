# Instructions: `add-astro-js-doc-block`

**Plan:** `astro-components`

**Iteration Id:** `add-astro-js-doc-block`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-astro-components/instructions/add-astro-js-doc-block__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `add-astro-js-doc-block`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

This section lists the path variables used in this instruction file. All file references in this instructions file MUST use these variables — never bare filesystem paths.

| Variable     | Resolved Path                      | Purpose                                                     |
| ------------ | ---------------------------------- | ----------------------------------------------------------- |
| `$WORKSPACE` | Current working directory          | Workspace root directory.                                   |
| `$PURRTRAIT` | `$WORKSPACE/checkouts/purrtrait`   | Monorepo hosting the package.                               |
| `$PACKAGE`   | `$PURRTRAIT/libs/astro-components` | Package receiving `JsDocBlock.astro`.                       |
| `$MODEL`     | `$PURRTRAIT/libs/jsdoc-renderer`   | The JSDoc core being consumed.                              |
| `$NO_COMPLY` | `$WORKSPACE/checkouts/no-comply`   | Reference app with the Solid JSDoc sections being mirrored. |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `add-astro-js-doc-block`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Complete the `@purrtrait/astro-components` docs surface: consume the published `@purrtrait/jsdoc-renderer@0.0.2` to render JSDoc descriptions (as markdown), tags, links, and function parameter/return entries in `JsDocBlock.astro`, with `Tags.astro` for tag lists — committed as `build(astro-components): Add js doc block component.`

## Mandatory Reading

This section lists the documentation and reference files the sub-agent needs to read before making changes.

- ::READ `$PURRTRAIT/_guide.md` (Guide) — Repository layout, conventions, setup, and verification. Relevant for every step.
- ::READ `$PURRTRAIT/node_modules/@noodlestan/conventions-typescript/art/index.md` (Conventions) — TypeScript conventions. Relevant for Steps 2 and 3.
- ::READ `$WORKSPACE/checkouts/ops/knowledge/design/manifest-policy.md` (Conventions) — Manifest pinning model: every `dependency` and `devDependency` is an exact `x.y.z`; only `peerDependencies` use caret ranges. Relevant for Step 1.
- ::READ `$WORKSPACE/knowledge/conventions/writing-commit-message.art` (Conventions) — Allowed commit types, scopes, and message format. Relevant for the commit step.
- ::READ `$MODEL/src/controllers/JsDocBlockRenderer/createJsDocBlockRenderer.ts`, `$MODEL/src/controllers/JsDocBlockRenderer/types.ts` (Source) — The factory and its `description`, `tags`, `links`, `params`, `returns` accessors, and `JsDocBlockRendererOptions.linkResolver`. Relevant for Step 3.
- ::READ `$MODEL/src/controllers/JsDocLinkResolver/types.ts` (Source) — `JsDocLinkResolverAPI`, `JsDocLinkItem`, and `TagItem` shapes. Relevant for Step 3.
- ::READ `$NO_COMPLY/apps/standard-ui-demo/src/modules/code/components/CodeDocDescription/CodeDocDescription.tsx` (Reference) — The Solid section being mirrored for the full docs surface. Relevant for Step 3.
- ::READ `$NO_COMPLY/apps/standard-ui-demo/src/modules/code/components/CodeDocDescription/parts/CodeDocTags/CodeDocTags.tsx` (Reference) — The tag list rendering being mirrored. Relevant for Step 2.
- ::READ `$NO_COMPLY/apps/standard-ui-demo/src/modules/code/components/CodeDocDescription/parts/CodeDocLinks/CodeDocLinks.tsx` (Reference) — The links list rendering being mirrored. Relevant for Step 3.
- ::READ `$NO_COMPLY/apps/standard-ui-demo/src/modules/code/components/CodeDocDescription/parts/CodeDocBody/CodeDocBody.tsx` (Reference) — Verifies descriptions render as plain text today; Astro renders markdown instead. Relevant for Step 3.
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

- Step 1 / 5 — Add the `@purrtrait/jsdoc-renderer` dependency
- Step 2 / 5 — Add `Tags.astro`
- Step 3 / 5 — Add `JsDocBlock.astro`
- Step 4 / 5 — Expose the components through the exports map and run the purrtrait CI
- Step 5 / 5 — Commit `add-astro-js-doc-block`

## Steps

This section contains the detailed steps to execute, including commit steps.

### Step `1 / 5` — Add the `@purrtrait/jsdoc-renderer` dependency

PREREQUISITE: `@purrtrait/jsdoc-renderer@0.0.2` MUST be resolvable from the npm registry (published by the user after Plan: Add JSDoc Renderer Package). If it is not resolvable, REPORT A BLOCKER.

In `$PACKAGE/package.json`:

- Add `"@purrtrait/jsdoc-renderer": "0.0.2"` to `dependencies` (exact pin), keeping the list alphabetically sorted.
- `marked` `18.1.2` and `@purrtrait/code-renderer` `0.0.11` must already be declared from the previous iteration — verify, do not add duplicates.

Then run from the `$PURRTRAIT` root:

```bash
npm install # refresh the lockfile with the new dependency
```

RULE: Do not change any other dependency version.

### Step `2 / 5` — Add `Tags.astro`

Create `$PACKAGE/src/components/Tags.astro` mirroring `CodeDocTags.tsx`:

- Props: `{ entries: TagItem[] }` with `TagItem` imported as a type from `@purrtrait/jsdoc-renderer`.
- Renders an unordered list where each entry shows `tag: value` — join array values with `', '`, render string values as-is. HTML-escape values when they are rendered as text (no `set:html`).
- Render nothing when `entries` is empty.

### Step `3 / 5` — Add `JsDocBlock.astro`

Create `$PACKAGE/src/components/JsDocBlock.astro` mirroring `CodeDocDescription.tsx`:

- Props: `{ jsdoc: JsDocData; title?: string; resolveLink?: (target: string) => { text: string; href: string } | undefined }` with `JsDocData` imported as a type from `@purrception/lang-ts`.
- Frontmatter:
  1. Build the renderer once: `const renderer = createJsDocBlockRenderer({ linkResolver: props.resolveLink ? { resolveLink: props.resolveLink } : undefined })` — the factory falls back to its built-in resolver when `linkResolver` is omitted; the injected resolver shape is exactly `JsDocLinkResolverAPI`.
  2. Collect the surface: `const description = renderer.description(props.jsdoc)`, `const tags = renderer.tags(props.jsdoc)`, `const links = renderer.links(props.jsdoc)`.
  3. Function entries: when `'paramTags' in props.jsdoc`, treat the node as `FunctionJsDocData` (type import from `@purrception/lang-ts`) and collect `const params = renderer.params(...)` and `const returns = renderer.returns(...)`; otherwise both are empty arrays/`undefined`.
  4. Render nothing: when description, tags, links, params, and returns are all empty, render an empty fragment (return no markup), regardless of `title`.
  5. Markdown: when a description exists, convert it to HTML with `marked` (`const descriptionHtml = await marked.parse(description)`) and render it with `set:html` so resolver links (`[text](href)`) become real anchors.
- Template:
  - `title` (when provided and content non-empty) renders as an `<h3 class="jsdoc-title">`.
  - Description HTML in a `<div class="jsdoc-description">`.
  - Tags through `<Tags entries={tags} />` when non-empty.
  - Links as a `<ul class="jsdoc-links">` of `<li><a href={link.href}>{link.text}</a></li>` when non-empty (import the `JsDocLinkItem` type from `@purrtrait/jsdoc-renderer`).
  - Params as a list of `name` entries with their values; returns as a single line — only when present.
- RULE: Any rendering gap found while porting the ApiScreen sections (missing tag, description, param, or member-description handling) is closed in `$PACKAGE` or in `$MODEL` — never in a consumer app. If closing it requires changing `$MODEL`, REPORT A BLOCKER instead of editing it in this iteration.
- RULE: do not import `.astro` files from any `.ts` file.

### Step `4 / 5` — Expose the components through the exports map and run the purrtrait CI

- Verify the `exports` map in `$PACKAGE/package.json` covers `./components/JsDocBlock.astro` and `./components/Tags.astro` through the existing `"./components/*"` wildcard; add explicit entries only if the wildcard does not resolve. The TS barrel (`src/index.ts`) keeps exporting `./lib` only — `.astro` components are never re-exported from TypeScript (vite and tsc cannot load `.astro` modules).
- Run from the `$PURRTRAIT` root:

```bash
npm run lint:fix # autofix formatting of the new files
npm run ci # lint, test and build
```

It must pass. If it fails and you cannot fix it within this iteration's scope, REPORT A BLOCKER with the failing output.

---

#### Commit: `add-astro-js-doc-block`

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
build(astro-components): Add js doc block component.
```

RULE: Commit from the `$PURRTRAIT` root on branch `main`, and stage only `$PACKAGE/**` and `$PURRTRAIT/package-lock.json`. Nothing else may be staged.

RULE: The commit message MUST be used verbatim. Do not add, remove, or reword any line.

---

## Final Verification

This section describes how to confirm the iteration is completed and ready for being committed.

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy — this commit is created and NOT pushed.
- Verify that `$PACKAGE/src/components/JsDocBlock.astro` and `$PACKAGE/src/components/Tags.astro` exist and no `.ts` file imports an `.astro` file.
- Verify that `$PACKAGE/package.json` declares `@purrtrait/jsdoc-renderer` `0.0.2` exactly, with no other dependency change from this iteration.
- Verify that `JsDocBlock.astro` renders an empty fragment when description, tags, links, params, and returns are all absent.
- Verify that descriptions render through `marked` (`set:html`), not as plain text.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
