import type { ObjectLiteralTypeNode } from '@purrception/lang-ts';
import type { CodeLayoutGroup, CodeLayoutNode } from '@purrtrait/code-renderer';

import type { LangTsLayoutContext } from '../../../private';
import { block, group, identifierToken, spaceToken, symbolToken } from '../layout';
import { layoutExpression } from '../layoutExpression';
import { appendSemicolon } from '../utils';

export function expObject(
	context: LangTsLayoutContext,
	node: ObjectLiteralTypeNode,
): CodeLayoutNode[] {
	const entries: CodeLayoutGroup[] = [];

	const members = Object.entries(node.members);

	for (const [key, member] of members) {
		entries.push(
			group([
				...(member.readonly ? [identifierToken('readonly'), spaceToken()] : []),
				identifierToken(key),
				...(member.optional ? [symbolToken('?')] : []),
				symbolToken(':'),
				spaceToken(),
				group(appendSemicolon(layoutExpression(context, member.type))),
			]),
		);
	}

	for (const signature of node.indexSignatures ?? []) {
		entries.push(
			group([
				...(signature.readonly ? [identifierToken('readonly'), spaceToken()] : []),
				symbolToken('['),
				identifierToken(signature.keyName),
				symbolToken(':'),
				spaceToken(),
				...layoutExpression(context, signature.keyType),
				symbolToken(']'),
				symbolToken(':'),
				spaceToken(),
				group(appendSemicolon(layoutExpression(context, signature.valueType))),
			]),
		);
	}

	for (const signature of node.mappedSignatures ?? []) {
		entries.push(
			group([
				...(signature.readonly ? [identifierToken('readonly'), spaceToken()] : []),
				symbolToken('['),
				identifierToken(signature.paramName),
				spaceToken(),
				identifierToken('in'),
				spaceToken(),
				...layoutExpression(context, signature.constraint),
				symbolToken(']'),
				...(signature.optional ? [symbolToken('?')] : []),
				symbolToken(':'),
				spaceToken(),
				group(appendSemicolon(layoutExpression(context, signature.valueType))),
			]),
		);
	}

	return [symbolToken('{'), spaceToken(), block(entries), spaceToken(), symbolToken('}')];
}
