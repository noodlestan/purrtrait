import { type FunctionTypeNode, createPrimitiveNode } from '@purrception/lang-ts';
import type { CodeLayoutNode } from '@purrtrait/code-renderer';

import type { LangTsLayoutContext } from '../../../private';
import { layoutGenerics } from '../generics';
import { group, identifierToken, keywordToken, spaceToken, symbolToken } from '../layout';
import { layoutExpression } from '../layoutExpression';
import { eachExpression } from '../utils';

export function expFunction(
	context: LangTsLayoutContext,
	node: FunctionTypeNode,
): CodeLayoutNode[] {
	return [
		...layoutGenerics(context, node.generic),

		group([
			symbolToken('('),

			...eachExpression(
				context,
				node.params ?? [],
				(_ctx, param) => [
					identifierToken(param.name),
					...(param.optional ? [symbolToken('?')] : []),
					symbolToken(':'),
					spaceToken(),
					...layoutExpression(context, param.type),
				],
				() => [symbolToken(','), spaceToken()],
			),

			symbolToken(')'),
		]),

		spaceToken(),
		symbolToken('=>'),
		spaceToken(),

		...(node.returns?.asserts
			? [
					keywordToken('asserts'),
					spaceToken(),
					identifierToken(node.returns.asserts.parameter),

					...(node.returns.asserts.type
						? [
								spaceToken(),
								keywordToken('is'),
								spaceToken(),
								...layoutExpression(context, node.returns.asserts.type),
							]
						: []),
				]
			: layoutExpression(context, node.returns ? node.returns.type : createPrimitiveNode('void'))),
	];
}
