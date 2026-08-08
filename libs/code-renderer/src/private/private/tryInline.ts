import type { CodeLayoutNode, CodeLayoutToken } from '../../structure';

import { getLength } from './getLength';

export function tryInline(nodes: CodeLayoutNode[], cols: number): CodeLayoutToken[] | null {
	const result: CodeLayoutToken[] = [];

	for (const node of nodes) {
		if (node.type === 'token') {
			result.push(node);
		} else if (node.type === 'group') {
			const inner = tryInline(node.content, cols);
			if (!inner) return null;
			result.push(...inner);
		} else if (node.type === 'block') {
			for (const group of node.content) {
				const inner = tryInline(group.content, cols);
				if (!inner) return null;
				result.push(...inner);
			}
		} else {
			return null;
		}
	}

	return getLength(result) > cols ? null : result;
}
