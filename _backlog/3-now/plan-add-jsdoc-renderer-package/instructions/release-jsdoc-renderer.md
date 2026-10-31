# Instructions: `release-jsdoc-renderer`

**Plan:** `add-jsdoc-renderer-package`

**Iteration Id:** `release-jsdoc-renderer`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

NOTE: Both commits in this iteration carry `policy` `NOCOMMIT`. Steps 1–5 prepare and STAGE the release; you then REPORT A BLOCKER and STOP. The user runs `npm publish` for both packages and tells the delegator to commit and continue — only then execute the commit steps. Never run `npm publish` yourself.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-add-jsdoc-renderer-package/instructions/release-jsdoc-renderer__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `release-jsdoc-renderer`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

This section lists the path variables used in this instruction file. All file references in this instructions file MUST use these variables — never bare filesystem paths.

| Variable         | Resolved Path                    | Purpose                                     |
| ---------------- | -------------------------------- | ------------------------------------------- |
| `$WORKSPACE`     | Current working directory        | Workspace root directory.                   |
| `$PURRTRAIT`     | `$WORKSPACE/checkouts/purrtrait` | Purrtrait monorepo — implementation target. |
| `$SOLID_CODE`    | `$PURRTRAIT/libs/solid-code`     | Package released as 0.0.13.                 |
| `$CODE_RENDERER` | `$PURRTRAIT/libs/code-renderer`  | Deployment record to mirror.                |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `release-jsdoc-renderer`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Prepare and gate the first npm publish of `@purrtrait/jsdoc-renderer` (0.0.1) together with the breaking `@purrtrait/solid-code` (0.0.13): version bumps, changelog entries, the deployment record, and the lockfile refresh are all staged by you — the user's only actions are `npm publish` for both packages and telling the delegator to commit and continue.

## Mandatory Reading

This section lists the documentation and reference files the sub-agent needs to read before making changes.

- ::READ `$PURRTRAIT/_guide.md` (Guide) — Package layout, conventions, setup, and verification. Relevant for every step.
- ::READ `$CODE_RENDERER/_records/npm-deployment.art` (Record) — The deployment record to mirror for the new package. Relevant for Step 3.
- ::READ `$WORKSPACE/knowledge/conventions/writing-commit-message.art` (Conventions) — Allowed commit types, scopes, and message format. Relevant for the commit steps.
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

- Step 1 / 7 — Bump `@purrtrait/jsdoc-renderer` to 0.0.1
- Step 2 / 7 — Bump `@purrtrait/solid-code` to 0.0.13
- Step 3 / 7 — Add the npm deployment record for `@purrtrait/jsdoc-renderer`
- Step 4 / 7 — Refresh the lockfile and run the purrtrait CI
- Step 5 / 7 — Stage the release and REPORT A BLOCKER (awaiting the user's `npm publish`)
- Step 6 / 7 — Commit `release-jsdoc-renderer` (after the user's publish confirmation)
- Step 7 / 7 — Commit `release-solid-code` (after the user's publish confirmation)

## Steps

This section contains the detailed steps to execute, including commit steps.

### Step `1 / 7` — Bump `@purrtrait/jsdoc-renderer` to 0.0.1

In `$PURRTRAIT/libs/jsdoc-renderer/package.json`, set `"version"` to `0.0.1` (from the `0.0.0` placeholder).

In `$PURRTRAIT/libs/jsdoc-renderer/CHANGELOG.md`, replace the `## Unreleased` section with:

```md
## 0.0.1

### Added

- First publish: framework-free JSDoc rendering core — `createJsDocBlockRenderer` (description, tags, links, params, returns accessors) and `createJsDocLinkResolver` (injectable link resolution).
```

### Step `2 / 7` — Bump `@purrtrait/solid-code` to 0.0.13

In `$SOLID_CODE/package.json`, set `"version"` to `0.0.13` (from `0.0.12`).

In `$SOLID_CODE/CHANGELOG.md`, insert a new top section directly under `# CHANGELOG`:

```md
## 0.0.13

### Removed

- **Breaking:** removed `createJsDocBlockRenderer`, `createJsDocLinkResolver`, `TagItem`, `JsDocLinkItem`, and the JSDoc options/API types — the JSDoc core now lives in `@purrtrait/jsdoc-renderer`.
```

Keep the existing `## 0.0.12` section untouched below it.

### Step `3 / 7` — Add the npm deployment record for `@purrtrait/jsdoc-renderer`

Create `$PURRTRAIT/libs/jsdoc-renderer/_records/npm-deployment.art` mirroring the shape of `$CODE_RENDERER/_records/npm-deployment.art` with:

- Title: `## NPM Package Deployment: JSDoc Renderer`
- `**Owner:** Package: JSDoc Renderer`
- `**Status:** `DEPLOYED``
- `**Build:**` / `**Deploy:**` / `**Registry:**` / `**Access:**` — same values as the mirrored record
- `**Canonical Name:** `@purrtrait/jsdoc-renderer``

### Step `4 / 7` — Refresh the lockfile and run the purrtrait CI

Run from the `$PURRTRAIT` root:

```bash
npm install # refresh package-lock.json with the bumped workspace versions
npm run ci
```

Both MUST pass before staging. If they fail, REPORT A BLOCKER with the failing output.

### Step `5 / 7` — Stage the release and REPORT A BLOCKER (awaiting the user's `npm publish`)

Stage the complete release set from the `$PURRTRAIT` root:

```bash
git add package-lock.json \
  libs/jsdoc-renderer/package.json libs/jsdoc-renderer/CHANGELOG.md \
  libs/jsdoc-renderer/_records/npm-deployment.art \
  libs/solid-code/package.json libs/solid-code/CHANGELOG.md
```

Then REPORT A BLOCKER per the "How to Report Back to the Delegator" section, stating:

- Everything is staged; versions are 0.0.1 (`@purrtrait/jsdoc-renderer`) and 0.0.13 (`@purrtrait/solid-code`).
- Awaiting the user to run `npm publish` from `$PURRTRAIT/libs/jsdoc-renderer` and from `$PURRTRAIT/libs/solid-code`.
- After the user confirms both publishes succeeded, they will instruct the delegator to commit and continue — then execute Steps 6 and 7.

RULE: Do NOT commit, do NOT push, do NOT run `npm publish` yourself, do NOT revert the staged changes. STOP here until the user's confirmation arrives.

---

#### Commit: `release-jsdoc-renderer`

**Policy:** NOCOMMIT — Agent MUST stage the changes, MUST NOT execute the commit, and MUST REPORT A BLOCKER.

**Message:**

```
release(jsdoc-renderer): Bump to 0.0.1 for first npm publish.

- Set version 0.0.1 and turn the CHANGELOG placeholder into the 0.0.1 entry.
- Add the npm deployment record for `@purrtrait/jsdoc-renderer`.
```

RULE: Execute this commit ONLY after the user has confirmed that `npm publish` succeeded for `@purrtrait/jsdoc-renderer`. Until then this commit is the blocker described in Step 5.

RULE: When unblocked, commit from the `$PURRTRAIT` root on branch `main`, keeping the staged set from Step 5 (`package-lock.json` and the `libs/jsdoc-renderer/` files). Do NOT push.

RULE: The commit message MUST be used verbatim. Do not add, remove, or reword any line.

---

#### Commit: `release-solid-code`

**Policy:** NOCOMMIT — Agent MUST stage the changes, MUST NOT execute the commit, and MUST REPORT A BLOCKER.

**Message:**

```
release(solid-code): Bump to 0.0.13 after dropping JSDoc exports.

- Record the dropped JSDoc exports in the CHANGELOG.
```

RULE: Execute this commit ONLY after the user has confirmed that `npm publish` succeeded for `@purrtrait/solid-code`. When unblocked, commit from the `$PURRTRAIT` root on branch `main`, staging only `$SOLID_CODE/package.json` and `$SOLID_CODE/CHANGELOG.md`. Do NOT push.

RULE: The commit message MUST be used verbatim. Do not add, remove, or reword any line.

---

## Final Verification

This section describes how to confirm the iteration is completed and ready for being committed.

**Instructions:**

- Verify that no commit was created before the user's publish confirmation, and that both commits exist — created and NOT pushed — only after it.
- Verify that `libs/jsdoc-renderer/package.json` reads 0.0.1 and `libs/solid-code/package.json` reads 0.0.13.
- Verify that both CHANGELOG files carry their new version sections and that no other version section was altered.
- Verify that `$PURRTRAIT/libs/jsdoc-renderer/_records/npm-deployment.art` exists with status `DEPLOYED` and canonical name `@purrtrait/jsdoc-renderer`.
- Verify that `package-lock.json` reflects the bumped versions.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
