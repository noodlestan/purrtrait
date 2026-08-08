import ts from 'typescript';

import type { TSXNode } from '../../nodes';
import type { TypescriptComponentNode } from '../types';

import {
	extractAttributeExpression,
	extractAttributeName,
	extractBooleanAttribute,
	extractChildren,
	extractStringAttribute,
} from './private';

export function extractProps(
	node: TypescriptComponentNode,
	sourceFile: ts.SourceFile,
	ignore?: (attr: ts.JsxAttribute) => boolean,
): Record<string, TSXNode> {
	const result: Record<string, TSXNode> = {};

	const attrs = ts.isJsxElement(node)
		? node.openingElement.attributes.properties
		: node.attributes.properties;

	for (const attr of attrs) {
		if (!ts.isJsxAttribute(attr) || (ignore && ignore(attr))) {
			continue;
		}

		const name = extractAttributeName(attr);

		if (!attr.initializer) {
			result[name] = extractBooleanAttribute();
			continue;
		}

		if (ts.isStringLiteral(attr.initializer)) {
			result[name] = extractStringAttribute(sourceFile, attr.initializer);
			continue;
		}

		if (ts.isJsxExpression(attr.initializer) && attr.initializer.expression) {
			result[name] = extractAttributeExpression(sourceFile, attr.initializer.expression);
		}
	}

	const children = extractChildren(sourceFile, node);

	if (children) {
		// eslint-disable-next-line dot-notation
		result['children'] = children;
	}

	return result;
}
