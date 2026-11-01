# Instructions: `drop-solid-code-jsdoc-exports`

**Plan:** `add-jsdoc-renderer-package`

**Iteration Id:** `drop-solid-code-jsdoc-exports`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-add-jsdoc-renderer-package/instructions/drop-solid-code-jsdoc-exports__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `drop-solid-code-jsdoc-exports`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

This section lists the path variables used in this instruction file. All file references in this instructions file MUST use these variables — never bare filesystem paths.

| Variable      | Resolved Path                    | Purpose                                     |
| ------------- | -------------------------------- | ------------------------------------------- |
| `$WORKSPACE`  | Current working directory        | Workspace root directory.                   |
| `$PURRTRAIT`  | `$WORKSPACE/checkouts/purrtrait` | Purrtrait monorepo — implementation target. |
| `$SOLID_CODE` | `$PURRTRAIT/libs/solid-code`     | Package whose JSDoc surface is dropped.     |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `drop-solid-code-jsdoc-exports`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Remove the duplicated JSDoc rendering surface from `@purrtrait/solid-code` — a deliberate breaking change — so the JSDoc core has a single home: `@purrtrait/jsdoc-renderer`. The package keeps only its Solid-specific exports.

## Mandatory Reading

This section lists the documentation and reference files the sub-agent needs to read before making changes.

- ::READ `$PURRTRAIT/_guide.md` (Guide) — Package layout, conventions, setup, and verification. Relevant for every step.
- ::READ `$PURRTRAIT/node_modules/@noodlestan/conventions-typescript/art/index.md` (Conventions) — TypeScript conventions for all packages in this repository. Relevant for every step.
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

- Step 1 / 3 — Delete the JSDoc controllers from `solid-code`
- Step 2 / 3 — Run the purrtrait CI
- Step 3 / 3 — Commit `drop-solid-code-jsdoc-exports`

## Steps

This section contains the detailed steps to execute, including commit steps.

### Step `1 / 3` — Delete the JSDoc controllers from `solid-code`

The two controllers under `$SOLID_CODE/src/controllers/` are the only controllers in the package, and nothing else in `solid-code` references them — the only internal references are the barrel `export *` lines. Verify that claim before deleting:

1. Confirm with a content search that no file under `$SOLID_CODE/src/components/` or `$SOLID_CODE/src/private/` imports from `controllers/JsDocBlockRenderer` or `controllers/JsDocLinkResolver`.
2. Delete the entire directory `$SOLID_CODE/src/controllers/` — this removes `createJsDocBlockRenderer.tsx`, both `types.tsx`, `createJsDocLinkResolver.ts`, both `private/` helper folders, and all controller barrels.
3. In `$SOLID_CODE/src/index.ts`, remove the line `export * from './controllers';`. The file must keep exporting `./components` and `./types`.

Expected outcome: the public surface of `@purrtrait/solid-code` is exactly `CodeBlock`, `CodeLayoutRenderer`, and the `CodeLinkComponent` type; no JSDoc symbol is exported anymore. This BREAKS consumers importing `createJsDocBlockRenderer`, `createJsDocLinkResolver`, `TagItem`, `JsDocLinkItem`, or the options/API types from `@purrtrait/solid-code` — they are migrated in the `update-no-comply-imports` iteration.

RULE: Do not modify `$SOLID_CODE/src/components/`, `$SOLID_CODE/src/private/`, or `$SOLID_CODE/src/types.ts`. Do not add a dependency on `@purrtrait/jsdoc-renderer` to `$SOLID_CODE/package.json` — nothing inside `solid-code` consumes the core.

### Step `2 / 3` — Run the purrtrait CI

Run from the `$PURRTRAIT` root:

```bash
npm run ci
```

It must pass with the controllers gone — proving no dangling imports remain. If it fails, REPORT A BLOCKER with the failing output.

---

#### Commit: `drop-solid-code-jsdoc-exports`

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
refactor(solid-code): Drop JSDoc exports; core lives in `@purrtrait/jsdoc-renderer`.
```

RULE: Commit from the `$PURRTRAIT` root on branch `main`, and stage only the deleted files under `$SOLID_CODE/src/`.

RULE: The commit message MUST be used verbatim. Do not add, remove, or reword any line.

---

## Final Verification

This section describes how to confirm the iteration is completed and ready for being committed.

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy — this commit is created and NOT pushed.
- Verify that `$SOLID_CODE/src/controllers/` no longer exists and `$SOLID_CODE/src/index.ts` exports only `./components` and `./types`.
- Verify that no exported symbol of `@purrtrait/solid-code` mentions JSDoc.
- Verify that `$SOLID_CODE/package.json` was not modified.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
