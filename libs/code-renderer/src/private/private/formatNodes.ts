import type { CodeLayoutLine, CodeLayoutNode, CodeLayoutToken } from '../../structure';

import { finalizeLine } from './finalizeLine';
import { getLength } from './getLength';
import { tryInline } from './tryInline';

export function formatNodes(
	nodes: CodeLayoutNode[],
	cols: number,
	indent: number,
): CodeLayoutLine[] {
	const lines: CodeLayoutLine[] = [];
	let current: CodeLayoutToken[] = [];

	for (const node of nodes) {
		if (node.type === 'token') {
			current.push(node);
			continue;
		}

		if (node.type === 'group') {
			const flat = tryInline(node.content, cols);
			const flatLen = flat ? getLength(flat) : Infinity;

			if (flat && getLength(current) + flatLen <= cols) {
				current.push(...flat);
				continue;
			}

			const flushed = finalizeLine(indent, current);
			if (flushed) {
				lines.push(flushed);
			}
			current = [];

			const groupLines = formatNodes(node.content, cols, indent + 1);
			lines.push(...groupLines);
			continue;
		}

		if (node.type === 'block') {
			const flat = tryInline(
				node.content.flatMap(g => g.content),
				cols,
			);
			const flatLen = flat ? getLength(flat) : Infinity;

			if (flat && getLength(current) + flatLen <= cols) {
				current.push(...flat);
				continue;
			}

			const flushed = finalizeLine(indent, current);
			if (flushed) {
				lines.push(flushed);
			}
			current = [];

			for (const group of node.content) {
				const groupLines = formatNodes(group.content, cols, indent + 1);
				lines.push(...groupLines);
			}
			continue;
		}
	}

	const flushed = finalizeLine(indent, current);
	if (flushed) {
		lines.push(flushed);
	}

	return lines;
}
