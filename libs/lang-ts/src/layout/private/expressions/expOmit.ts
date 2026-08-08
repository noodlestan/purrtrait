import type { OmitTypeNode } from '@purrception/lang-ts';
import type { CodeLayoutNode } from '@purrtrait/code-renderer';

import type { LangTsLayoutContext } from '../../../private';
import { keywordToken, spaceToken, symbolToken } from '../layout';
import { layoutExpression } from '../layoutExpression';

export function expOmit(context: LangTsLayoutContext, node: OmitTypeNode): CodeLayoutNode[] {
	return [
		keywordToken('Omit'),
		symbolToken('<'),
		...layoutExpression(context, node.source),
		symbolToken(','),
		spaceToken(),
		...layoutExpression(context, node.members),
		symbolToken('>'),
	] as CodeLayoutNode[];
}
