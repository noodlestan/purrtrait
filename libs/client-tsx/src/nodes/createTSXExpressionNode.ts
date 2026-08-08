import type { TypescriptExpressionNode } from '../extract';

import type { TSXExpressionNode } from './types';

export function createTSXExpressionNode(
	node: TypescriptExpressionNode,
	serialized: string,
): TSXExpressionNode {
	return {
		type: 'expression',
		tsNode: node,
		serialized,
	};
}
