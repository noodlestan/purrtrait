# PurrtraitProvider

## Summary

Add a provider to the Standard UI demo that exposes purrtrait resources needed during app setup and rendering.

## Scope

- `$PROJECT = apps/standard-ui-demo`

## User story

As the demo app bootstraps rendering services, I need a provider that resolves purrception language data, so the syntax highlighter and related consumers can look up language metadata through a stable context API.

## Refined

- Create `PurrtraitProvider` under `$PROJECT/src/providers`, following the same conventions as the existing `Rendering` provider.
- Expose a context API with `getPurrceptionLang('')` as the primary lookup entry.
- Wire the provider into the app setup.
- Add a test case under `$PROJECT/src/app/screens/ComponentsScreen/pages/ComponentsIndexPage`.
- Use `usePurrtraitProvider()` in the test case and verify the context can be consumed.

## Unrefined

- Decide whether the provider should expose only language lookup or a broader purrtrait resource surface.
- Confirm where the provider should be initialized relative to `RenderingProvider`.
- Decide how missing or unknown language IDs should be handled.

## Acceptance criteria

- `PurrtraitProvider` exists in `$PROJECT/src/providers`.
- The app is wrapped with the provider.
- `usePurrtraitProvider()` is usable from the Components screen test case.
- `getPurrceptionLang('')` is available through the provider context.

