import ts from 'typescript';

import {
	type TSXExpressionNode,
	type TSXHandlerNode,
	createTSXExpressionNode,
	createTSXHandlerNode,
} from '../../../nodes';
import type { TypescriptExpressionNode } from '../../types';
import { printNode } from '../printNode';

export function extractAttributeExpression(
	sourceFile: ts.SourceFile,
	expr: TypescriptExpressionNode,
): TSXExpressionNode | TSXHandlerNode {
	if (ts.isArrowFunction(expr) || ts.isFunctionExpression(expr)) {
		return createTSXHandlerNode(expr, printNode(sourceFile, expr));
	}

	return createTSXExpressionNode(expr, printNode(sourceFile, expr));
}
