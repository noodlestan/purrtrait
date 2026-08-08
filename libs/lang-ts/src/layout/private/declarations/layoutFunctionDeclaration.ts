import {
	type FunctionDeclaration,
	type FunctionTypeReturns,
	createPrimitiveNode,
	isFunctionTypeNode,
} from '@purrception/lang-ts';
import type { CodeLayoutNode } from '@purrtrait/code-renderer';

import {
	type LangTsLayoutContext,
	createLangTsLayoutContextWithGenericParams,
} from '../../../private';
import { layoutGenerics } from '../generics';
import { group, identifierToken, keywordToken, spaceToken, symbolToken } from '../layout';
import { layoutExpression } from '../layoutExpression';
import { eachExpression } from '../utils';

export function layoutFunctionDeclaration(
	context: LangTsLayoutContext,
	declaration: FunctionDeclaration,
): CodeLayoutNode[] {
	const node = declaration.node;
	if (!isFunctionTypeNode(node)) {
		return [
			keywordToken('const'),
			spaceToken(),
			identifierToken(declaration.name),
			symbolToken(':'),
			spaceToken(),
			...layoutExpression(context, node),
		];
	}

	const genericCtx = createLangTsLayoutContextWithGenericParams(
		context,
		node.generic?.map(x => x.name) ?? [],
	);

	const returns = (node.returns as FunctionTypeReturns) || createPrimitiveNode('void');

	return [
		keywordToken('function'),
		spaceToken(),
		identifierToken(declaration.name),
		...layoutGenerics(context, node.generic),
		symbolToken('('),
		group(
			eachExpression(
				context,
				node.params,
				(context, item) => [
					identifierToken(item.name),
					symbolToken(':'),
					spaceToken(),
					...layoutExpression(genericCtx, item.type),
				],
				() => [symbolToken(','), spaceToken()],
			),
		),
		symbolToken(')'),
		symbolToken(':'),
		spaceToken(),
		...layoutExpression(genericCtx, returns.type),
	];
}
