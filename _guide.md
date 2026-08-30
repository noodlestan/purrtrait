# Purrtrait

Code rendering and layout system for data extracted from source code. A standalone npm workspaces monorepo providing TypeScript/TSX language support, code layout, SolidJS renderers, editable TSX abstractions, and in-browser parsing utilities.

## Recommended Reading

Agents SHOULD scan these files for definitions and resource locations when faced with uncertainty or ambiguity that may result from missing resources.

- `_guide.md` — this file: system overview, layout, records, workflows, and operating instructions.
- `_records/project.art` — the project record.
- `_records/repository.art` — the repository record.

## Repository Layout

```
_backlog/           — plans, instructions, reports
_records/           — project, repository, namespace, and license records
libs/               — library packages
```

## Projects

| Project          | Guide                          | Backlog     |
| ---------------- | ------------------------------ | ----------- |
| Purrtrait (root) | `_guide.md`                    | `_backlog/` |
| Lang TS          | `libs/lang-ts/_guide.md`       | `NONE`      |
| Code Renderer    | `libs/code-renderer/_guide.md` | `NONE`      |
| Solid Code       | `libs/solid-code/_guide.md`    | `NONE`      |
| View TSX         | `libs/view-tsx/_guide.md`      | `NONE`      |
| Client TSX       | `libs/client-tsx/_guide.md`    | `NONE`      |

## Records Management

Records are co-located with the resources they describe in `_records/` directories:

- **Project:** `_records/project.art`
- **Repository:** `_records/repository.art`
- **Namespace:** `_records/namespace.art`
- **License:** `_records/license.art`

## Workflows

### Planning Work

This project plans its work with the workflow defined in `$DOMAINS/work/workflows/planning-work/workflow.art`.

- The backlog lives at `_backlog/` with subdirectories such as `/3-now` and `/4-next/`.

## Operating Instructions

### Operating Instructions: Setting Up

**Instructions:**

Run from the repository root (monorepo):

```bash
npm ci # to install dependencies.
```

### Operating Instructions: Verifying Completion

**Instructions:**

Run from the repository root (monorepo):

```bash
npm run ci # lint, build and test
```
