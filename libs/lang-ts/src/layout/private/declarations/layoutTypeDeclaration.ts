import type { TypeExpressionDeclaration } from '@purrception/lang-ts';
import type { CodeLayoutNode } from '@purrtrait/code-renderer';

import {
	type LangTsLayoutContext,
	createLangTsLayoutContextWithGenericParams,
} from '../../../private';
import { layoutGenerics } from '../generics';
import { identifierToken, keywordToken, spaceToken, symbolToken } from '../layout';
import { layoutExpression } from '../layoutExpression';

export function layoutTypeDeclaration(
	context: LangTsLayoutContext,
	declaration: TypeExpressionDeclaration,
): CodeLayoutNode[] {
	const { name, node } = declaration;

	const genericCtx = createLangTsLayoutContextWithGenericParams(
		context,
		node.generic?.map(x => x.name) ?? [],
	);

	return [
		keywordToken('type'),
		spaceToken(),
		identifierToken(name),
		...layoutGenerics(context, node.generic),
		spaceToken(),
		symbolToken('='),
		spaceToken(),
		...layoutExpression(genericCtx, node),
	] as CodeLayoutNode[];
}
