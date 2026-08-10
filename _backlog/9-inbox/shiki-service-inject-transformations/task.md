# Inject transformations into SyntaxHighlighter

## Depends on

- [`purrtrait-shiki-service-extracted-to-own-package`](../4-next/purrtrait-shiki-service-extracted-to-own-package.md) — SyntaxHighlighter must be in its own package first.

## Summary

Add a transformation injection mechanism to the `SyntaxHighlighter` service so consumers can provide Shiki transformer factories that rewrite highlighted output against a symbol map.

## User story

As a consumer of the SyntaxHighlighter, I need to inject transformations that match tokens against a symbol map and wrap matched tokens in link elements pointing to the symbol's API documentation page.

## Refined

- The `SyntaxHighlighterLangOptions.shiki.transformers` factory already accepts a `SyntaxHighlighterTransformContext` carrying `symbols: SyntaxHighlighterSymbolMap | undefined`.
- Implement a default transformer that:
  - Receives the symbol map from the transform context.
  - In each Shiki `span` token line, matches token text against symbol map entries.
  - Wraps matched tokens in `<a href="<symbol-url>">` tags.
- Update the `CodeLink` component at `$SCOPE/app/components/code/CodeLink/` to render a `<Lnk>` from `@no-comply/standard-ui` linking to the symbol's API page, using `props.token.link` as the href.
- Wire the transformer factory into the service's default lang options so the symbol linker is active when symbols are provided.
- Ensure the transformer is a no-op when no symbol map is present.

## Unrefined

- Decide whether the transformer should live inside `$ROOT/libs/purrtrait-shiki-service/` or in the app-level `$SCOPE/app/components/code/`.
- Confirm the exact `<Lnk>` import path and API from `@no-comply/standard-ui`.
- Decide if the transformer should match full token text only, or support partial/prefix matching.
- The `CodeLink` component currently targets the code-renderer pipeline (`CodeLayoutToken`) rather than the Shiki HTML output — clarify whether the transformation rewrites Shiki's HTML directly (producing `<a>` tags in the HTML string) or post-processes the rendered DOM to mount Solid `<CodeLink>` components.
- Future: extend `CodeLink` to render a popover with the target symbol description (out of scope for this task).

## Acceptance criteria

- A transformation exists that reads `symbols` from the SyntaxHighlighter transform context and wraps matched tokens in links.
- The transformation is wired into the service's default language options.
- The `CodeLink` component renders a `<Lnk>` linking to `props.token.link`.
- No links are injected when the symbol map is absent or empty.
