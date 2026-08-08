import type { TypescriptElementNode } from '../extract';

import type { TSXElementNode } from './types';

export function createTSXElementNode(
	node: TypescriptElementNode,
	serialized: string,
): TSXElementNode {
	return {
		type: 'jsx',
		tsNode: node,
		serialized,
	};
}
