import ts from 'typescript';

import type { TSXViewOptions } from '../types';

import { isTargetAttr } from './isTargetAttr';

export function getTargetAttrValue(
	options: TSXViewOptions,
	node: ts.Node,
	fallback: string,
): string | undefined {
	if (!ts.isJsxAttribute(node) || !isTargetAttr(options, node)) {
		return undefined;
	}

	const value = node.initializer;

	if (value && ts.isStringLiteral(value)) {
		return value.text;
	}

	return fallback;
}
