import type ts from 'typescript';

import { type TSXExpressionNode, createTSXExpressionNode } from '../../../nodes';
import { printNode } from '../printNode';

export function extractStringAttribute(
	sourceFile: ts.SourceFile,
	node: ts.StringLiteral,
): TSXExpressionNode {
	return createTSXExpressionNode(node, printNode(sourceFile, node));
}
