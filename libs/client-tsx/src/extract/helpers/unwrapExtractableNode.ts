import ts from 'typescript';

import { type TypescriptNode } from '../types';

import { isExtractableElementNode } from './isExtractableElementNode';

export function unwrapExtractableNode(node: ts.Node): TypescriptNode {
	if (!ts.isSourceFile(node)) {
		if (!isExtractableElementNode(node)) {
			throw new Error('Expected extractable JSX node');
		}

		return node;
	}

	const child = node.statements[0];

	if (!child) {
		throw new Error('Expected source file to contain a JSX root');
	}

	if (ts.isExpressionStatement(child) && isExtractableElementNode(child.expression)) {
		return child.expression;
	}

	throw new Error('Expected source file root expression to be extractable JSX');
}
