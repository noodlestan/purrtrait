# Guide: Purrtrait

> Host and manage the Purrtrait packages and tools, and their planning artefacts.

Monorepo containing the Purrtrait roadmap, libraries for source code transformation, rendering, and syntax highlighting, CLI tools for metadata extraction, and their backlogs.

**Management:** Uses Workflow: Planning Work with one backlog per package, coordinating with Workflow: Roadmapping from one project-wide roadmap.

## Recommended Reading

Agents SHOULD scan these files for relevant clarifications when faced with ambiguity or omissions that may result from missing definitions.

- `_guide.md` — this file: system overview, layout, setup, verification.
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

Projects in this repository use the following workflows:

| Workflow / Path                                                        | Purpose                                                                                           |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Planning Work** `$DOMAINS/work/workflows/planning-work/workflow.art` | Create and manage work item lifecycles, collecting operational instructions according to context. |

### Planning Work

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

Runs automatically on pre-commit hook (from the repository root):

```bash
npm run ci # lint, test and build
```
