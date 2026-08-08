import type ts from 'typescript';

export function extractAttributeName(attr: ts.JsxAttribute): string {
	return (attr.name as ts.Identifier).text;
}
