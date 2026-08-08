import type { ComponentDeclaration } from '@purrception/lang-ts';
import type { CodeLayoutNode } from '@purrtrait/code-renderer';

import type { LangTsLayoutContext } from '../../../private';
import { identifierToken, keywordToken, spaceToken, symbolToken } from '../layout';
import { layoutExpression } from '../layoutExpression';

export function layoutComponentDeclaration(
	context: LangTsLayoutContext,
	declaration: ComponentDeclaration,
): CodeLayoutNode[] {
	return [
		keywordToken('const'),
		spaceToken(),
		identifierToken(declaration.name),
		symbolToken(':'),
		spaceToken(),
		keywordToken('Component'),
		symbolToken('<'),
		...(declaration.node.props ? layoutExpression(context, declaration.node.props) : []),
		symbolToken('>'),
	];
}
