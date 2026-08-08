import ts from 'typescript';

import type { TypescriptNode } from '../types';

export function isExtractableElementNode(node: ts.Node): node is TypescriptNode {
	return ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node) || ts.isJsxFragment(node);
}
