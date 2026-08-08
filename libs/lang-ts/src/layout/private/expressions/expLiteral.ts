import type { LiteralTypeNode } from '@purrception/lang-ts';
import type { CodeLayoutNode } from '@purrtrait/code-renderer';

import type { LangTsLayoutContext } from '../../../private';
import { literalToken } from '../layout';

export function expLiteral(_context: LangTsLayoutContext, node: LiteralTypeNode): CodeLayoutNode[] {
	return [literalToken(node.value)];
}
