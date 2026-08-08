import type { TupleTypeElement, TupleTypeNode } from '@purrception/lang-ts';
import type { CodeLayoutNode } from '@purrtrait/code-renderer';

import type { LangTsLayoutContext } from '../../../private';
import { group, identifierToken, symbolToken } from '../layout';
import { layoutExpression } from '../layoutExpression';
import { eachExpression } from '../utils';

function tupleElement(context: LangTsLayoutContext, element: TupleTypeElement): CodeLayoutNode[] {
	if ('kind' in element) {
		return layoutExpression(context, element);
	}

	const tokens: CodeLayoutNode[] = [
		identifierToken(element.name),
		element.optional ? symbolToken('?') : null,
		symbolToken(':'),
		symbolToken(' '),
		...layoutExpression(context, element.type),
	].filter(Boolean) as CodeLayoutNode[];
	return tokens;
}

export function expTuple(context: LangTsLayoutContext, node: TupleTypeNode): CodeLayoutNode[] {
	return [
		group([
			symbolToken('['),
			...eachExpression(context, node.elements, tupleElement, () => [
				symbolToken(','),
				symbolToken(' '),
			]),
			symbolToken(']'),
		]),
	];
}
