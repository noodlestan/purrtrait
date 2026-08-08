import type { ArrayTypeNode } from '@purrception/lang-ts';
import type { CodeLayoutNode } from '@purrtrait/code-renderer';

import type { LangTsLayoutContext } from '../../../private';
import { symbolToken } from '../layout';
import { layoutExpression } from '../layoutExpression';

export function expArray(context: LangTsLayoutContext, node: ArrayTypeNode): CodeLayoutNode[] {
	return [...layoutExpression(context, node.elements), symbolToken('[]')];
}
