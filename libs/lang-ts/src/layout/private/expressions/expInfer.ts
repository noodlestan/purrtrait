import type { InferTypeNode } from '@purrception/lang-ts';
import type { CodeLayoutNode } from '@purrtrait/code-renderer';

import type { LangTsLayoutContext } from '../../../private';
import { identifierToken, keywordToken, spaceToken } from '../layout';

export function expInfer(_context: LangTsLayoutContext, node: InferTypeNode): CodeLayoutNode[] {
	return [keywordToken('infer'), spaceToken(), identifierToken(node.name)];
}
