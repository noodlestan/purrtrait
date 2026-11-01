# Instructions: `update-no-comply-imports`

**Plan:** `add-jsdoc-renderer-package`

**Iteration Id:** `update-no-comply-imports`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-add-jsdoc-renderer-package/instructions/update-no-comply-imports__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `update-no-comply-imports`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

This section lists the path variables used in this instruction file. All file references in this instructions file MUST use these variables — never bare filesystem paths.

| Variable     | Resolved Path                    | Purpose                                         |
| ------------ | -------------------------------- | ----------------------------------------------- |
| `$WORKSPACE` | Current working directory        | Workspace root directory.                       |
| `$PURRTRAIT` | `$WORKSPACE/checkouts/purrtrait` | Source of the published packages.               |
| `$NO_COMPLY` | `$WORKSPACE/checkouts/no-comply` | Reference app migrated to the new import paths. |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `update-no-comply-imports`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Migrate the `$NO_COMPLY` reference app to the new import paths immediately after the publish: install `@purrtrait/jsdoc-renderer@0.0.1` and `@purrtrait/solid-code@0.0.13`, import the JSDoc factories and types from the core package, and keep `CodeLinkComponent` coming from `@purrtrait/solid-code` — so no JSDoc symbol is ever imported from `@purrtrait/solid-code` again.

## Mandatory Reading

This section lists the documentation and reference files the sub-agent needs to read before making changes.

- ::READ `$NO_COMPLY/_guide.md` (Guide) — No Comply layout, conventions, setup, and verification. Relevant for every step.
- ::READ `$NO_COMPLY/apps/standard-ui-demo/src/providers/Rendering/private/createRenderingContext.ts` (Reference) — The wiring being migrated; keep the `createJsDocLinkResolver({ resolveLink })` → `createJsDocBlockRenderer({ linkResolver })` flow identical. Relevant for Step 2.
- ::READ `$WORKSPACE/knowledge/conventions/writing-commit-message.art` (Conventions) — Allowed commit types, scopes, and message format. Relevant for the commit step.
- RULE: You MUST follow any links under `## Mandatory Reading` sections found in the listed files.
- RULE: If you are unable to read a file linked under `## Mandatory Reading` you must stop and REPORT A BLOCKER.

---

## Operating Instructions

### Setting Up

**Purpose:** Prepare the execution environment. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/setting-up/operation.art`.

**Instructions:** (From `$NO_COMPLY/_guide.md`)

Run from the `$NO_COMPLY` root:

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

**Instructions:** (From `$NO_COMPLY/_guide.md`)

Run from the `$NO_COMPLY` root:

```bash
npm run ci # lint, build and test
```

All steps MUST pass.

---

## Changes

This section summarises the changes to be made in this iteration.

- Step 1 / 4 — Install the published purrtrait packages
- Step 2 / 4 — Switch the JSDoc imports to `@purrtrait/jsdoc-renderer`
- Step 3 / 4 — Run the no-comply CI
- Step 4 / 4 — Commit `update-no-comply-imports`

## Steps

This section contains the detailed steps to execute, including commit steps.

### Step `1 / 4` — Install the published purrtrait packages

PREREQUISITE: `@purrtrait/jsdoc-renderer@0.0.1` and `@purrtrait/solid-code@0.0.13` MUST already be published on the npm registry (done by the user in the `release-jsdoc-renderer` iteration). If either version is not resolvable, REPORT A BLOCKER.

In `$NO_COMPLY/apps/standard-ui-demo/package.json`:

- Add `"@purrtrait/jsdoc-renderer": "0.0.1"` to `dependencies`, keeping the list alphabetically sorted.
- Change `"@purrtrait/solid-code": "0.0.12"` to `"@purrtrait/solid-code": "0.0.13"`.

Then run from the `$NO_COMPLY` root:

```bash
npm install # refresh the lockfile with the new versions
```

Do not change any other dependency version.

### Step `2 / 4` — Switch the JSDoc imports to `@purrtrait/jsdoc-renderer`

Four files import JSDoc symbols from `@purrtrait/solid-code`; switch exactly those symbols to `@purrtrait/jsdoc-renderer`:

1. `$NO_COMPLY/apps/standard-ui-demo/src/providers/Rendering/private/createRenderingContext.ts` — change the import of `createJsDocBlockRenderer`, `createJsDocLinkResolver` to come from `@purrtrait/jsdoc-renderer`. Keep `import type { CodeLinkComponent } from '@purrtrait/solid-code';` untouched. The wiring body (`createJsDocLinkResolver({ resolveLink })` → `createJsDocBlockRenderer({ linkResolver })`, and the accessor usage) must NOT change — the APIs are identical.
2. `$NO_COMPLY/apps/standard-ui-demo/src/providers/Rendering/types.ts` — change the import of `JsDocBlockRendererAPI`, `JsDocLinkResolverAPI` to come from `@purrtrait/jsdoc-renderer`. Keep `CodeLinkComponent` out of that import (it stays from `@purrtrait/solid-code`).
3. `$NO_COMPLY/apps/standard-ui-demo/src/modules/code/components/CodeDocDescription/parts/CodeDocTags/CodeDocTags.tsx` — change `import type { TagItem } from '@purrtrait/solid-code';` to import `TagItem` from `@purrtrait/jsdoc-renderer`.
4. `$NO_COMPLY/apps/standard-ui-demo/src/modules/code/components/CodeDocDescription/parts/CodeDocLinks/CodeDocLinks.tsx` — change `import type { JsDocLinkItem } from '@purrtrait/solid-code';` to import `JsDocLinkItem` from `@purrtrait/jsdoc-renderer`.

RULE: No file in `$NO_COMPLY` may import `createJsDocBlockRenderer`, `createJsDocLinkResolver`, `TagItem`, `JsDocLinkItem`, `JsDocBlockRendererAPI`, or `JsDocLinkResolverAPI` from `@purrtrait/solid-code` after this step. `CodeLinkComponent` continues to come from `@purrtrait/solid-code`.

### Step `3 / 4` — Run the no-comply CI

Run from the `$NO_COMPLY` root:

```bash
npm run ci # lint, build and test
```

It must pass with the new imports. If it fails, REPORT A BLOCKER with the failing output.

---

#### Commit: `update-no-comply-imports`

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
refactor(standard-ui-demo): Import JSDoc core from `@purrtrait/jsdoc-renderer`.
```

RULE: Commit from the `$NO_COMPLY` root on branch `main`, and stage only `$NO_COMPLY/apps/standard-ui-demo/package.json`, the refreshed `package-lock.json`, and the four modified source files.

RULE: The commit message MUST be used verbatim. Do not add, remove, or reword any line.

---

## Final Verification

This section describes how to confirm the iteration is completed and ready for being committed.

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy — this commit is created and NOT pushed.
- Verify that `grep -rn "@purrtrait/solid-code" $NO_COMPLY/apps/standard-ui-demo/src` returns only `CodeLinkComponent` imports.
- Verify that all JSDoc symbols (`createJsDocBlockRenderer`, `createJsDocLinkResolver`, `TagItem`, `JsDocLinkItem`, `JsDocBlockRendererAPI`, `JsDocLinkResolverAPI`) are imported from `@purrtrait/jsdoc-renderer`.
- Verify that `apps/standard-ui-demo/package.json` declares `@purrtrait/jsdoc-renderer` `0.0.1` and `@purrtrait/solid-code` `0.0.13`, with no other dependency change.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
