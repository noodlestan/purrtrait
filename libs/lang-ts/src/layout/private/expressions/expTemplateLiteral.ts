import type { TemplateLiteralTypeNode } from '@purrception/lang-ts';
import type { CodeLayoutNode } from '@purrtrait/code-renderer';

import type { LangTsLayoutContext } from '../../../private';
import { stringToken, symbolToken } from '../layout';
import { layoutExpression } from '../layoutExpression';

export function expTemplateLiteral(
	context: LangTsLayoutContext,
	node: TemplateLiteralTypeNode,
): CodeLayoutNode[] {
	return [
		symbolToken('`'),
		stringToken(node.head),
		...node.spans.flatMap(span => [
			symbolToken('${'),
			...layoutExpression(context, span.type),
			symbolToken('}'),
			stringToken(span.text),
		]),
		symbolToken('`'),
	];
}
