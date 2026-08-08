import type { TypeExpressionGeneric } from '@purrception/lang-ts';
import type { CodeLayoutNode } from '@purrtrait/code-renderer';

import type { LangTsLayoutContext } from '../../../private';
import { identifierToken, keywordToken, spaceToken, symbolToken } from '../layout';
import { layoutExpression } from '../layoutExpression';
import { eachExpression } from '../utils';

export function layoutGenerics(
	context: LangTsLayoutContext,
	generic?: TypeExpressionGeneric[],
): CodeLayoutNode[] {
	if (!generic?.length) {
		return [];
	}

	return [
		symbolToken('<'),

		...eachExpression(
			context,
			generic,
			(_ctx, item) => [
				identifierToken(item.name),

				...(item.constraint
					? [
							spaceToken(),
							keywordToken('extends'),
							spaceToken(),
							...layoutExpression(context, item.constraint),
						]
					: []),

				...(item.default
					? [
							spaceToken(),
							symbolToken('='),
							spaceToken(),
							...layoutExpression(context, item.default),
						]
					: []),
			],
			() => [symbolToken(','), spaceToken()],
		),

		symbolToken('>'),
	];
}
