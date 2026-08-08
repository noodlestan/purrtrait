import type { MappedTypeNode } from '@purrception/lang-ts';
import type { CodeLayoutNode } from '@purrtrait/code-renderer';

import type { LangTsLayoutContext } from '../../../private';
import { group, identifierToken, keywordToken, spaceToken, symbolToken } from '../layout';

export function expMapped(_context: LangTsLayoutContext, node: MappedTypeNode): CodeLayoutNode[] {
	return [
		group([
			symbolToken('{'),
			spaceToken(),
			...(node.readonly ? [keywordToken('readonly'), spaceToken()] : []),
			symbolToken('['),
			identifierToken(node.param),
			spaceToken(),
			keywordToken('in'),
			spaceToken(),
			identifierToken(node.constraint),
			symbolToken(']'),
			...(node.optional ? [symbolToken('?')] : []),
			symbolToken(':'),
			spaceToken(),
			identifierToken(node.valueType),
			spaceToken(),
			symbolToken('}'),
		]),
	];
}
