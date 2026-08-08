import type ts from 'typescript';

import type { TypescriptElementNode, TypescriptFunctionNode, TypescriptNode } from '../extract';

export type TSXNodeType = 'jsx' | 'handler' | 'expression';

export type TSXBaseNode<T extends TSXNodeType, N extends TypescriptNode> = {
	type: T;
	tsNode: N;
	serialized: string;
};

export type TSXElementNode = TSXBaseNode<'jsx', TypescriptElementNode>;

export type TSXHandlerNode = TSXBaseNode<'handler', TypescriptFunctionNode>;

export type TSXExpressionNode = TSXBaseNode<'expression', ts.Expression>;

export type TSXNode = TSXElementNode | TSXHandlerNode | TSXExpressionNode;
