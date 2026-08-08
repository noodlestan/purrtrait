import ts from 'typescript';

import { TARGET_ATTRIBUTE_NAME } from '../constants';

export function findTargetNode(node: ts.Node): ts.JsxElement | ts.JsxSelfClosingElement | null {
	let found: ts.JsxElement | ts.JsxSelfClosingElement | null = null;

	function visit(n: ts.Node) {
		if (ts.isJsxSelfClosingElement(n) || ts.isJsxElement(n)) {
			const attrs = ts.isJsxElement(n)
				? n.openingElement.attributes.properties
				: n.attributes.properties;

			for (const a of attrs) {
				if (
					ts.isJsxAttribute(a) &&
					ts.isIdentifier(a.name) &&
					a.name.text === TARGET_ATTRIBUTE_NAME
				) {
					found = n;
					return;
				}
			}
		}

		ts.forEachChild(n, visit);
	}

	visit(node);
	return found;
}
