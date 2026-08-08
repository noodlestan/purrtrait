import ts from 'typescript';

import type { TSXViewOptions } from '../types';

export function createTSXViewTargetPlaceholder(
	options: TSXViewOptions,
	keyValue: string,
	componentName: string,
): ts.JsxSelfClosingElement {
	const props = [
		ts.factory.createJsxAttribute(
			ts.factory.createIdentifier(options.placeholderPropsProp),
			ts.factory.createJsxExpression(
				undefined,
				ts.factory.createIdentifier(options.placeholderPropsVar),
			),
		),
		ts.factory.createJsxAttribute(
			ts.factory.createIdentifier(options.placeholderKeyProp),
			ts.factory.createStringLiteral(keyValue),
		),
		ts.factory.createJsxAttribute(
			ts.factory.createIdentifier(options.placeholderComponentProp),
			ts.factory.createStringLiteral(componentName),
		),
	];

	return ts.factory.createJsxSelfClosingElement(
		ts.factory.createIdentifier(options.placeholderName),
		undefined,
		ts.factory.createJsxAttributes(props),
	);
}
