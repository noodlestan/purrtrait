import type { InterfaceDeclaration } from '@purrception/lang-ts';
import type { CodeLayoutNode } from '@purrtrait/code-renderer';

import {
	type LangTsLayoutContext,
	createLangTsLayoutContextWithGenericParams,
} from '../../../private';
import { layoutGenerics } from '../generics';
import { block, group, identifierToken, keywordToken, spaceToken, symbolToken } from '../layout';
import { layoutExpression } from '../layoutExpression';
import { appendSemicolon, eachExpression } from '../utils';

export function layoutInterfaceDeclaration(
	context: LangTsLayoutContext,
	declaration: InterfaceDeclaration,
): CodeLayoutNode[] {
	const { name, node } = declaration;

	const genericCtx = createLangTsLayoutContextWithGenericParams(
		context,
		node.generic?.map(x => x.name) ?? [],
	);

	return [
		keywordToken('interface'),
		spaceToken(),
		identifierToken(name),
		...layoutGenerics(context, node.generic),
		...(node.heritage?.length ? [spaceToken(), keywordToken('extends'), spaceToken()] : []),
		...eachExpression(
			genericCtx,
			node.heritage,
			(genericCtx, heritage) => layoutExpression(genericCtx, heritage),
			() => [symbolToken(','), spaceToken()],
		),
		...(node.heritage ? [spaceToken()] : []),
		symbolToken('{'),
		spaceToken(),
		block(
			Object.entries(node.members).map(([key, member], i, arr) => {
				return group([
					identifierToken(key),
					...(member.optional ? [symbolToken('?')] : []),
					symbolToken(':'),
					spaceToken(),
					group(appendSemicolon(layoutExpression(genericCtx, member.type))),
					...(i < arr.length - 1 ? [spaceToken()] : []),
				]);
			}),
		),
		spaceToken(),
		symbolToken('}'),
	];
}
