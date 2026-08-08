import type { OperatorTypeNode } from '@purrception/lang-ts';
import type { CodeLayoutNode } from '@purrtrait/code-renderer';

import type { LangTsLayoutContext } from '../../../private';
import { keywordToken, spaceToken } from '../layout';
import { layoutExpression } from '../layoutExpression';

export function expOperator(
	context: LangTsLayoutContext,
	node: OperatorTypeNode,
): CodeLayoutNode[] {
	return [keywordToken(node.operator), spaceToken(), ...layoutExpression(context, node.operand)];
}
