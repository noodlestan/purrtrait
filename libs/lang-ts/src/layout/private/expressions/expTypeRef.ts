import type { TypeRefNode } from '@purrception/lang-ts';
import type { CodeLayoutNode } from '@purrtrait/code-renderer';

import type { LangTsLayoutContext } from '../../../private';
import { identifierToken, spaceToken, symbolToken, typeRefToken } from '../layout';
import { layoutExpression } from '../layoutExpression';
import { eachExpression } from '../utils';

export function expTypeRef(context: LangTsLayoutContext, node: TypeRefNode): CodeLayoutNode[] {
	const nodes: CodeLayoutNode[] = [typeRefToken(context, node.ref)];

	if (node.params) {
		nodes.push(
			symbolToken('<'),
			...eachExpression(
				context,
				node.params,
				(context, param) => layoutExpression(context, param),
				() => [symbolToken(','), spaceToken()],
			),
			symbolToken('>'),
		);
	}

	if (node.member) {
		nodes.push(
			symbolToken('['),
			symbolToken("'"),
			identifierToken(node.member),
			symbolToken("'"),
			symbolToken(']'),
		);
	}

	return nodes;
}
