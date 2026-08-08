import ts from 'typescript';

import { type TSXExpressionNode, createTSXExpressionNode } from '../../../nodes';

export function extractBooleanAttribute(): TSXExpressionNode {
	return createTSXExpressionNode(ts.factory.createTrue(), 'true');
}
