import type { Declaration, TypeExpressionNode } from '@purrception/lang-ts';
import type { CodeLayoutNode } from '@purrtrait/code-renderer';

import type { LangTsLayoutContext } from '../../private';

import { layoutDeclaration } from './layoutDeclaration';
import { layoutExpression } from './layoutExpression';

import { typeRefToken } from '.';

export function layoutCode(context: LangTsLayoutContext, code: string | object): CodeLayoutNode[] {
	if (typeof code === 'string') {
		return [typeRefToken(context, code)];
	}
	if (!('at' in code)) {
		return layoutExpression(context, code as TypeExpressionNode);
	}
	if ('at' in code) {
		return layoutDeclaration(context, code as Declaration);
	}

	console.error(`Invalid code block:`, code);
	throw new Error(`Invalid code block.`);
}
