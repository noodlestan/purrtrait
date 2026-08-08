# @purrtrait/client-tsx

> In-browser TypeScript/TSX parsing and AST utilities.

This package is part of the [@purrtrait](../../README.md) toolkit.

This package provides low-level utilities for parsing, inspecting,
and serializing TypeScript and TSX code in the browser.

Although it focuses purely on **language structure**, not execution, rendering, or UI composition, it was designed for **interactive component environments**: documentation sandboxes, visual editors, and runtime JSX evaluation in the browser.

It is not a build tool replacement and should not be used for production compilation pipelines.

## Features

- Parse TS / TSX into TypeScript AST
- Serialize AST nodes into string representations
- Extract typed value models from JSX and TypeScript expressions

## Installation

```bash
npm install @purrtrait/client-tsx
```

⚠️ **Peer dependencies:** Also install if not in your project already:

- `typescript`

## Usage

### Parsing a simple TS expression

```ts
const input = `[1, 2, 3]`;
const ast = parseSource(input);
```

Output is approximatelly:

```
ts.SourceFile
└─ts.ArrayLiteralExpression
  ├─ ts.NumericLiteral
  ├─ ts.NumericLiteral
  └─ ts.NumericLiteral
```

### Parsing TSX expressions

```ts
const input = `<Button>{foo}</Button>`;
const parsed = parseSource(input);
```

Output is approximatelly:

```
ts.Source.file
└─ts.JSXEpression
  ├─ ts.JsxOpeningElement (Button)
  ├─ ts.JsxExpression (foo)
  └─ ts.JsxClosingElement

```

### Extracting props from JSX

```ts
const input = `<Button variant="danger"><Icon icon={TrashIcon}/> Delete</Button>`;
const sourceFile = parseSource(source.trim());
const props = extractProps(input, sourceFile);
```

Outputs a map of `TSXNode` for all props, including children.

```
{
  variant: {
    type: 'expression',
    tsNode: ts.StringLiteral,
    serialized: 'danger'
  },
  children: {
    type: 'JSX',
    tsNode: ts.JsxFragment,
    serialized: '<><Icon icon={TrashIcon}/> Delete</>'
  }
}
```

## API

### parseSource(source: string)

Parses TS/TSX source into a TypeScript AST.

```ts
function parseSource(source: string): ts.SourceFile;
printNode(node: ts.Node)
```

### printNode(source: string)

Serializes a TypeScript AST node back into its source code.

Note that this does not execute any code or compile JSX.

```ts
function printNode(node: ts.Node): string;
```

### extractProps(node: ts.Node)

Extracts JSX props, including children, from a JSX expression such as `<Button variant="danger">....</Button>` into lightweight `TSXNode`.

The optional `ignore` param can be used to filter out specific props.

```ts
export function extractProps(
  node: TypescriptComponentNode,
  sourceFile: ts.SourceFile,
  ignore?: (attr: ts.JsxAttribute) => boolean,
): Record<string, TSXNode>;
```

### Node types

These types are used to classify types of TS nodes that are especially relevant for building documentation

```ts
type TSXElementNode = {
  type: 'jsx';
  tsNode: TypescriptElementNode;
  serialized: string;
};

type TSXHandlerNode = {
  type: 'handler';
  tsNode: TypescriptFunctionNode;
  serialized: string;
};

type TSXExpressionNode = {
  type: 'expression';
  tsNode: ts.Expression;
  serialized: string;
};

type TSXNode = TSXElementNode | TSXHandlerNode | TSXExpressionNode;
```

## Development

Make sure you read the [@purrtrait README](../../README.md) first.

### Build Targets

This library is distributed as ESM and intended to be processed by a bundler such as Vite or Astro. The main entry point is the Typescript source code.

### Scripts

- **$** `npm run dev` - uses `Vite` to (re)build on changes
- **$** `npm run build` - uses `Vite` to do produce a dry build in `dist/`.
- **$** `npm run lint` / `npm run lint:fix` - uses [@noodlestan/eslint-config](https://www.npmjs.com/package/@noodlestan/eslint-config).

## MIT License

Copyright (c) 2026 [Noodlestan](https://noodlestan.org/).

Published under a [MIT license](https://noodlestan.mit-license.org/).
