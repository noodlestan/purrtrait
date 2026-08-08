import type { TypeExpressionNode } from '@purrception/lang-ts';
import type { CodeLayoutNode } from '@purrtrait/code-renderer';

import type { LangTsLayoutContext } from '../../private';

import {
	expArray,
	expConditional,
	expFunction,
	expInfer,
	expIntersection,
	expLiteral,
	expMapped,
	expObject,
	expOmit,
	expOperator,
	expPick,
	expPrimitive,
	expTemplateLiteral,
	expTuple,
	expUnion,
} from './expressions';
import { expTypeRef } from './expressions/expTypeRef';

export function layoutExpression(
	context: LangTsLayoutContext,
	exp: TypeExpressionNode,
): CodeLayoutNode[] {
	switch (exp.kind) {
		case 'ref':
			return expTypeRef(context, exp);
		case 'primitive':
			return expPrimitive(context, exp);
		case 'object':
			return expObject(context, exp);
		case 'intersection':
			return expIntersection(context, exp);
		case 'union':
			return expUnion(context, exp);
		case 'pick':
			return expPick(context, exp);
		case 'omit':
			return expOmit(context, exp);
		case 'literal':
			return expLiteral(context, exp);
		case 'array':
			return expArray(context, exp);
		case 'tuple':
			return expTuple(context, exp);
		case 'template-literal':
			return expTemplateLiteral(context, exp);
		case 'operator':
			return expOperator(context, exp);
		case 'mapped':
			return expMapped(context, exp);
		case 'conditional':
			return expConditional(context, exp);
		case 'infer':
			return expInfer(context, exp);
		case 'function':
			return expFunction(context, exp);
		default:
			throw new Error(`Unknown kind ${(exp as TypeExpressionNode).kind} in expression`);
	}
}
