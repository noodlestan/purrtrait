import type { CodeLayoutNode } from '@purrtrait/code-renderer';

import { group, symbolToken } from '../layout';

export function appendSemicolon(nodes: CodeLayoutNode[]): CodeLayoutNode[] {
	if (nodes.length === 0) return [symbolToken(';')];

	const clone = [...nodes];
	const target = clone[clone.length - 1] as CodeLayoutNode;

	function descend(node: CodeLayoutNode): CodeLayoutNode {
		if (node.type !== 'group' && node.type !== 'block') {
			return group([node, symbolToken(';')]);
		}

		const inner = [...node.content];
		if (inner.length === 0) {
			return group([symbolToken(';')]);
		}

		// recurse into last child
		const target = inner[inner.length - 1] as CodeLayoutNode;
		inner[inner.length - 1] = descend(target);
		return group(inner);
	}

	clone[clone.length - 1] = descend(target);
	return clone;
}
