# Instructions: `consolidate-jsdoc-rendering`

**Plan:** `add-jsdoc-renderer-package`

**Iteration Id:** `consolidate-jsdoc-rendering`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

NOTE: The single commit in this iteration carries `policy` `NOCOMMIT`. Steps 1–6 prepare and STAGE the fix and release; you then REPORT A BLOCKER and STOP. The user runs `npm publish` for `@purrtrait/jsdoc-renderer@0.0.2` and tells the delegator to commit and continue — only then execute the commit step. Never run `npm publish` yourself.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-add-jsdoc-renderer-package/instructions/consolidate-jsdoc-rendering__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `consolidate-jsdoc-rendering`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

This section lists the path variables used in this instruction file. All file references in this instructions file MUST use these variables — never bare filesystem paths.

| Variable      | Resolved Path                    | Purpose                                     |
| ------------- | -------------------------------- | ------------------------------------------- |
| `$WORKSPACE`  | Current working directory        | Workspace root directory.                   |
| `$PURRTRAIT`  | `$WORKSPACE/checkouts/purrtrait` | Purrtrait monorepo — implementation target. |
| `$SOLID_CODE` | `$PURRTRAIT/libs/solid-code`     | Source of the vitest config to mirror.      |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `consolidate-jsdoc-rendering`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Repair the `description()` fallback bug in `@purrtrait/jsdoc-renderer` (the pinned `offset`-skip quirk), enforce the sibling coverage thresholds via a package `vitest.config.ts`, and prepare the `0.0.2` release — stopping at the publish gate where the user runs `npm publish` and the delegator commits.

## Mandatory Reading

This section lists the documentation and reference files the sub-agent needs to read before making changes.

- ::READ `$PURRTRAIT/_guide.md` (Guide) — Package layout, conventions, setup, and verification. Relevant for every step.
- ::READ `$PURRTRAIT/libs/jsdoc-renderer/src/controllers/JsDocBlockRenderer/createJsDocBlockRenderer.ts` (Source) — The file you fix; read the `description()` loop and its doc comments first. Relevant for Step 1.
- ::READ `$PURRTRAIT/libs/jsdoc-renderer/src/controllers/JsDocBlockRenderer/createJsDocBlockRenderer.test.ts` (Source) — The characterization tests to unpin. Relevant for Step 2.
- ::READ `$SOLID_CODE/vitest.config.ts` (Reference) — The sibling coverage config to mirror. Relevant for Step 3.
- ::READ `$PURRTRAIT/node_modules/@noodlestan/conventions-unit-tests/art/index.md` (Conventions) — Unit Test conventions. Relevant for Step 2.
- ::READ `$PURRTRAIT/node_modules/@noodlestan/conventions-typescript/art/index.md` (Conventions) — TypeScript conventions. Relevant for every step.
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

All steps MUST pass — including the new coverage thresholds from Step 3.

---

## Changes

This section summarises the changes to be made in this iteration.

- Step 1 / 7 — Fix the `description()` offset skip
- Step 2 / 7 — Unpin the characterization tests and extend coverage
- Step 3 / 7 — Add `vitest.config.ts` with sibling thresholds
- Step 4 / 7 — Run the purrtrait CI with thresholds enforced
- Step 5 / 7 — Prepare the 0.0.2 release (version, changelog, lockfile)
- Step 6 / 7 — Stage everything and REPORT A BLOCKER (awaiting the user's `npm publish`)
- Step 7 / 7 — Commit `consolidate-jsdoc-renderer` (after the user's publish confirmation)

## Steps

This section contains the detailed steps to execute, including commit steps.

### Step `1 / 7` — Fix the `description()` offset skip

In `$PURRTRAIT/libs/jsdoc-renderer/src/controllers/JsDocBlockRenderer/createJsDocBlockRenderer.ts`, inside `description()`, the `for (const match of desc.matchAll(/\{@link\s+([^}]+)\}/g))` loop pushes fallback text in two branches — an unresolved target (`parts.push(rawTarget); continue;`) and `serializeLink → undefined` (`parts.push(resolved.text); continue;`) — and both `continue` statements skip `offset = index + full.length`, so the raw description tail is re-emitted after the fallback text.

Fix: update `offset = index + full.length` BEFORE the fallback branches (immediately after slicing the preceding text), so every branch advances the cursor.

Expected outcomes:

- `See {@link missing} now.` with an unresolvable target renders `See missing now.` (previously: `See missingSee {@link missing} now.`).
- A `serializeLink` override returning `undefined` renders the resolved display text once, followed by the remaining text.
- Resolved-link behaviour is unchanged: text before the placeholder, then `[text](href)`, then the remaining text.

RULE: Do not change the public API, the regex, or any accessor other than `description()`.

### Step `2 / 7` — Unpin the characterization tests and extend coverage

In `$PURRTRAIT/libs/jsdoc-renderer/src/controllers/JsDocBlockRenderer/createJsDocBlockRenderer.test.ts`:

- Replace the two pinned characterization expectations (the ones asserting the duplicated tail with explanatory comments) with assertions of the corrected output from Step 1.
- Extend the tests to cover the branches the last coverage report left uncovered: `createJsDocBlockRenderer.ts` lines 28/51, `resolveName.ts` line 25, `createJsDocLinkResolver.ts` line 8 — e.g. the no-`link`-tags path, the `serializeLink → undefined` path, the `resolveName` fall-through returning the full text, and the default (non-injected) `resolveLink` path. Follow the unit-test conventions index.

Do not weaken any existing assertion.

### Step `3 / 7` — Add `vitest.config.ts` with sibling thresholds

Create `$PURRTRAIT/libs/jsdoc-renderer/vitest.config.ts` mirroring `$SOLID_CODE/vitest.config.ts` verbatim (same shape and values): `include: ['src/**/*.test.ts']`, `passWithNoTests: true`, coverage provider `v8`, reporters `['text', 'text-summary']`, exclude `['src/index.ts']`, and thresholds `{ lines: 90, functions: 90, branches: 70, statements: 90 }`.

### Step `4 / 7` — Run the purrtrait CI with thresholds enforced

Run from the `$PURRTRAIT` root:

```bash
npm run ci
```

It must pass with the thresholds now enforced for `@purrtrait/jsdoc-renderer`. If coverage falls short, extend tests (Step 2) — never lower the thresholds. If it cannot be resolved, REPORT A BLOCKER with the coverage output.

### Step `5 / 7` — Prepare the 0.0.2 release (version, changelog, lockfile)

- In `$PURRTRAIT/libs/jsdoc-renderer/package.json`, set `"version"` to `0.0.2` (from `0.0.1`).
- In `$PURRTRAIT/libs/jsdoc-renderer/CHANGELOG.md`, insert a `## 0.0.2` section directly under `# CHANGELOG`:

  ```md
  ## 0.0.2

  ### Fixed

  - `description()` no longer re-emits the raw text after an unresolved `{@link …}` target or a `serializeLink` override returning `undefined`.

  ### Added

  - `vitest.config.ts` enforcing the sibling coverage thresholds (90/70/90/90).
  ```

  Keep the `## 0.0.1` section untouched below it.

- Run `npm install` from the `$PURRTRAIT` root to refresh `package-lock.json` with the bumped version, then `npm run ci` once more.

### Step `6 / 7` — Stage everything and REPORT A BLOCKER (awaiting the user's `npm publish`)

Stage from the `$PURRTRAIT` root:

```bash
git add package-lock.json \
  libs/jsdoc-renderer/package.json libs/jsdoc-renderer/CHANGELOG.md \
  libs/jsdoc-renderer/vitest.config.ts \
  libs/jsdoc-renderer/src/
```

Then REPORT A BLOCKER per the "How to Report Back to the Delegator" section, stating:

- Everything is staged; the version is 0.0.2 (`@purrtrait/jsdoc-renderer`), the bug is fixed, and thresholds are enforced and green.
- Awaiting the user to run `npm publish` from `$PURRTRAIT/libs/jsdoc-renderer`.
- After the user confirms the publish succeeded, they will instruct the delegator to commit and continue — then execute Step 7.

RULE: Do NOT commit, do NOT push, do NOT run `npm publish` yourself, do NOT revert the staged changes. STOP here until the user's confirmation arrives.

---

#### Commit: `consolidate-jsdoc-renderer`

**Policy:** NOCOMMIT — Agent MUST stage the changes, MUST NOT execute the commit, and MUST REPORT A BLOCKER.

**Message:**

```
fix(jsdoc-renderer): Repair description fallback; enforce coverage; release 0.0.2.

- Fix the `description()` offset skip so unresolved links no longer re-emit the raw tail.
- Add `vitest.config.ts` mirroring sibling coverage thresholds; extend tests.
- Bump to 0.0.2 with a CHANGELOG entry for the publish.
```

RULE: Execute this commit ONLY after the user has confirmed that `npm publish` succeeded for `@purrtrait/jsdoc-renderer@0.0.2`. Until then this commit is the blocker described in Step 6.

RULE: When unblocked, commit from the `$PURRTRAIT` root on branch `main`, keeping the staged set from Step 6. Do NOT push.

RULE: The commit message MUST be used verbatim. Do not add, remove, or reword any line.

---

## Final Verification

This section describes how to confirm the iteration is completed and ready for being committed.

**Instructions:**

- Verify that no commit was created before the user's publish confirmation, and that the commit exists — created and NOT pushed — only after it.
- Verify that `description()` renders `See {@link missing} now.` as `See missing now.` with an unresolvable target, and that the two characterization pins are gone.
- Verify that `$PURRTRAIT/libs/jsdoc-renderer/vitest.config.ts` exists with the sibling thresholds and that `npm run ci` passes with them enforced.
- Verify that `libs/jsdoc-renderer/package.json` reads 0.0.2, the CHANGELOG carries a `## 0.0.2` section with the `## 0.0.1` section untouched, and `package-lock.json` reflects 0.0.2.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
