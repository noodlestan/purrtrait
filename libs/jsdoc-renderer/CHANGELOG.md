# CHANGELOG

## 0.0.2

### Fixed

- `description()` no longer re-emits the raw text after an unresolved `{@link …}` target or a `serializeLink` override returning `undefined`.

### Added

- `vitest.config.ts` enforcing coverage thresholds per policy (90/70/90/90).

## 0.0.1

### Added

- First publish: framework-free JSDoc rendering core — `createJsDocBlockRenderer` (description, tags, links, params, returns accessors) and `createJsDocLinkResolver` (injectable link resolution).
