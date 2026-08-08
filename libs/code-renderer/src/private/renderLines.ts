import type { CodeLayoutLine } from '../structure';
import type { CodeRendererContext, CodeRendererOptions } from '../types';

import { computeLayout } from './computeLayout';
import { formatLayout } from './formatLayout';

const EMPTY_LINE: CodeLayoutLine = {
	indent: 0,
	content: [],
};

export function renderLines(
	renderContext: CodeRendererOptions,
	snippetContext: CodeRendererContext,
	lang: string,
	node: object | object[],
): CodeLayoutLine[] {
	const nodes = Array.isArray(node) ? node : [node];
	return nodes.flatMap((node, index) => {
		const layoutGroup = computeLayout(renderContext, snippetContext, lang, node);
		const formattedLines = formatLayout(layoutGroup, snippetContext.columns);

		return index === 0 ? formattedLines : [EMPTY_LINE, ...formattedLines];
	});
}
