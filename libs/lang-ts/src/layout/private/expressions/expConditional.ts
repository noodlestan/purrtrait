import type { ConditionalTypeNode } from '@purrception/lang-ts';
import type { CodeLayoutNode } from '@purrtrait/code-renderer';

import type { LangTsLayoutContext } from '../../../private';
import { keywordToken, spaceToken, symbolToken } from '../layout';
import { layoutExpression } from '../layoutExpression';

export function expConditional(
	context: LangTsLayoutContext,
	node: ConditionalTypeNode,
): CodeLayoutNode[] {
	return [
		...layoutExpression(context, node.checkType),
		spaceToken(),
		keywordToken('extends'),
		spaceToken(),
		...layoutExpression(context, node.extendsType),
		spaceToken(),
		symbolToken('?'),
		spaceToken(),
		...layoutExpression(context, node.trueType),
		spaceToken(),
		symbolToken(':'),
		spaceToken(),
		...layoutExpression(context, node.falseType),
	];
}
