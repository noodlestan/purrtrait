import type { UnionTypeNode } from '@purrception/lang-ts';
import type { CodeLayoutNode } from '@purrtrait/code-renderer';

import type { LangTsLayoutContext } from '../../../private';
import { group, spaceToken, symbolToken } from '../layout';
import { layoutExpression } from '../layoutExpression';
import { eachExpression } from '../utils';

export function expUnion(context: LangTsLayoutContext, node: UnionTypeNode): CodeLayoutNode[] {
	return [
		group(
			eachExpression(
				context,
				node.entries,
				(context, entry) => layoutExpression(context, entry),
				() => [spaceToken(), symbolToken('|'), spaceToken()],
			),
		),
	];
}
