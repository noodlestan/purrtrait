import type { PrimitiveNode } from '@purrception/lang-ts';
import type { CodeLayoutNode } from '@purrtrait/code-renderer';

import type { LangTsLayoutContext } from '../../../private';

export function expPrimitive(_context: LangTsLayoutContext, node: PrimitiveNode): CodeLayoutNode[] {
	return [{ type: 'token', kind: 'identifier', value: node.primitive }];
}
