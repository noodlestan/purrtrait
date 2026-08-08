import type { TypescriptComponentNode } from '@purrtrait/client-tsx';
import ts from 'typescript';

export function extractComponentName(node: TypescriptComponentNode): string {
	const tagName = ts.isJsxElement(node) ? node.openingElement.tagName : node.tagName;

	if (ts.isIdentifier(tagName)) {
		return tagName.getFullText();
	}

	throw new Error('Unsupported component name shape');
}
