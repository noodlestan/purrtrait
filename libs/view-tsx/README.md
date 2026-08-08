# @purrtrait/view-tsx

> Absractions for modelling editable TSX code.

This package is part of the [@purrtrait](../../README.md) toolkit.

This package provides high level abstractions for modelling editable TSX code.

It was designed for **interactive component environments**: documentation sandboxes, visual editors, and runtime JSX evaluation in the browser.

## Features

Extract editable view models from TSX snippets into a framework-agnostic representation suitable for React, SolidJS, and custom runtimes.

Supports independent editing of:

- **Multitple target components**
- **Template wrapper** – everything around the target components
- **Target component props** – including children, classified as `TSXNode`

Used together with a TypeScript parser and a runtime compiler, this package allows TSX snippets to be extracted into structured editable models, modified at a fine-grained level, and later recompiled into executable JSX.

This allows wrapper structure and target component props to be edited independently in a way that only requires re-extracting the view and re-compiling the wrapper component when the wrapper itself is modified.

## Installation

```bash
npm install @purrtrait/view-tsx
```

⚠️ **Peer dependencies:** Also install if not in your project already:

- `typescript`

## Usage

### Dependencies

This package is intended to be used together with:

- `@purrtrait/client-ts` for parsing and AST utilities
- `@purrpose/client-babel` for runtime compilation and evaluation

The extracted model itself contains no runtime execution logic.

### Extracting a view model

Given the following TSX:

```tsx
<h1>Hello</h1>
<div>
  <Button tsx-view-target />
  <Button tsx-view-target intent="negative" onClick={() => console.log('!')}>
    <Display>foo</Display>
  </Button>
</div>
```

Extract the view with `extractTSXView()`

```ts
import { extractTSXView } from '@purrtrait/view-tsx';
const view = extractTSXView(source);
```

The captured result extracts the targets from the wrapper expression, capturing all props with `TSXNode` nodes from `@purrtrait/client-tsx`.

````yaml
wrapper:
  type: 'jsx'
  serialized: '<><h1>Hello</h1><div><TSXViewTargetPlaceholder key="0" component="Button" props={props} /><TSXViewTargetPlaceholder key="1" component="Button" props={props} /></div></>'
targets:
  '0':
  component:
    name: 'Button'
    1':
  component:
    name: 'Button'
    rops:
    intent:
      type: 'expression'
      tsNode: ...
      serialized: '"negative"'
    onClick:
      type: 'handler'
      tsNode: ...
      serialized: '() => console.log("!")'
    children:
      type: 'jsx'
      tsNode: ...
      serialized: '<><Display>foo</Display></>'
``

### Target nodes

Target nodes are identified using an attribute.

The attribute name is `tsx-view-target` by default and is configurable via `options`.

```tsx
<Button tsx-view-target />
````

You can provide a name for each, some, or all of the targets.

If multitple targets are present and no names are provided, an auto-incremented index is generated for each one.

```tsx
<Button tsx-view-target="first" />
<Button tsx-view-target /> // becomes '1'
<Button tsx-view-target /> // becomes '2'
<Button tsx-view-target="last" />
```

If nested targets are found, only the top-most targets are kept. Any nested content inside a target is treated as its `children` prop.

```tsx
<Button tsx-view-target />
<Button tsx-view-target="parent">
  <Button tsx-view-target /> // not captured as a target, but as children of `parent`
</Button>
```

The `tsx-view-target` attribute is used only during extraction and is not included in the resulting view model.

### Placeholder components

All valid targets are replaced in the the wrapper (both in the enclosed `tsNode` and the `serialized` value) by a placeholder component.

This component will receive the target `key` and `component` name, along with an extra `props` prop.

```tsx
<TSXViewTargetPlaceholder key="0" component="Button" props={props} />
```

There is no implementation for the placeholder.

When compiling the wrapper, you will need to populate the scope with the implementation for the placeholder, along with the implementations of any components invoked in the wrapper template.

This is easy to achieve with a library such as `@purrpose/babel-client`.

#### Example implementation

If you chose to provide the compiled wrapper with all props of all targets at once (ideally indexed by key).

You can easily retrieve the original props inside of each instance, before rendering the target component.

```tsx
const TSXViewTargetPlaceholder = (props: Record<string, unknown>) => {
  const key = () => props[PLACEHOLDER_KEY_PROP] || '';
  const component = () => props[PLACEHOLDER_COMPONENT_PROP] || '';
  const allProps = () => props[PLACEHOLDER_PROPS_PROP] || {};
  const ownProps = () => allProps()[key()] || {};

  return <Dynamic component={component()} {...ownProps} />;
};
```

You can also use the placeholder renderer to merge props from other sources such as a playground props table.

### Props and Children extraction

All props passed to each target are stored in the view.

You can use these values to populate props tables or provide further documentation.

Children are extracted as a normal prop:

```ts
view.targets[0].props.children = `<span>World</span>`;
```

Multiple children are normalized into a fragment:

```tsx
<>
  <Display />
  <Text />
</>
```

This keeps all editable values represented by a single `TSXNode`.

## API

### `extractTSXView(source, options)`

Extracts a TSX view model synchronously.

```ts
function extractTSXView(source: string, options?: Partial<TSXViewOptions>): TSXView;
```

### `TSXView`

```ts
type TSXView = {
  source: string;
  wrapper: TSXElementNode;
  targets: {
    [key: string]: TSXViewTarget;
  };
};

export type TSXViewTarget = {
  component: {
    name: string;
  };
  raw: TSXElementNode;
  props: Record<string, TSXNode>;
};
```

### Options

```ts
export type TSXViewOptions = {
  targetAttributeName: string;
  placeholderName: string;
  placeholderKeyProp: string;
  placeholderComponentProp: string;
  placeholderPropsProp: string;
  placeholderPropsVar: string;
};
```

The default values are exported as constants so that you can reference them in your rendering code.

```ts
TARGET_ATTRIBUTE_NAME = 'tsx-view-target';
PLACEHOLDER_NAME = 'TSXViewTargetPlaceholder';
PLACEHOLDER_KEY_PROP = 'key';
PLACEHOLDER_COMPONENT_PROP = 'component';
PLACEHOLDER_PROPS_PROP = 'props';
PLACEHOLDER_PROPS_VARIABLE = 'props';
```

### Helpers

#### `viewPropsByTarget(...)`

Retrieve props for a specific target.

```ts
function viewTargetProps(
  view: TSXView,
  targetKey: string,
  evaluate: PropEvaluator,
): Record<string, unknown>;
```

The evalutator function determines the prop values based on each node. It is invoked with the prop `name` the full `TSXNode` and the `targetKey` in case you need fulll context.

```ts
type PropEvaluator = (entry: [name: string, node: TSXNode, targetKey: string]) => unknown;
```

The simplest use case is it to retrieve the original `serialized` value of each prop.

```ts
const targetProps = viewTargetProps(view, '0', ([, node]) => {
  return node.serialized;
});
// {
//   intent: '"negative"'
//   onClick: '() => console.log("!")'
//   children: '<><Display>foo</Display></>'
// }
```

You can also use it to compile to executable javascript.

```ts
const targetProps = viewTargetProps(view, '0', ([, value]) => {
  return evaluateValue(compiler, value, components),
});
// {
//   intent: "negative",
//   onClick: () => console.log("!"),
//   children: JSX.Component => <><Display...
// }
```

#### `viewPropsByTarget(...)`

Retrieve props of all props at once.

```ts
function viewPropsByTarget(
  view: TSXView,
  evaluate: PropEvaluator,
): Record<string, ViewTargetPropsTransformed>;
```

The evalutator function determines the prop values based on each node.

This example retrieves the orifginal serialized value of each prop.

```ts
const targetProps = viewTargetProps(view, '0', ([, node]) => {
  return node.serialized;
});
// "0": { },
// "1": {
//   intent: '"negative"'
//   onClick: '() => console.log("!")'
//   children: '<><Display>foo</Display></>'
// }

## Development

Make sure you read the [namespace README](../../README.md) first.

### Build Targets

This library is distributed as ESM and intended to be processed by a bundler such as Vite or Astro. The main entry point is the Typescript source code.

### Scripts

- **$** `npm run dev` - uses `Vite` to (re)build on changes
- **$** `npm run build` - uses `Vite` to do produce a dry build in `dist/`.
- **$** `npm run lint` / `npm run lint:fix` - uses [@noodlestan/eslint-config](https://www.npmjs.com/package/@noodlestan/eslint-config).

## MIT License

Copyright (c) 2026 [Noodlestan](https://noodlestan.org/).

Published under a [MIT license](https://noodlestan.mit-license.org/).
```
