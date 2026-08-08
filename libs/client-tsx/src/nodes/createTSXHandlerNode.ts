import type ts from 'typescript';

import type { TSXHandlerNode } from './types';

export function createTSXHandlerNode(
	node: ts.ArrowFunction | ts.FunctionExpression,
	serialized: string,
): TSXHandlerNode {
	return {
		type: 'handler',
		tsNode: node,
		serialized,
	};
}
