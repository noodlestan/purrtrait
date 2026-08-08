import { computeLayout, formatLayout } from '../../private';
import type { CodeRendererContext, CodeRendererOptions } from '../../types';

import type { CodeLayoutAPI, CodeLayoutOptions } from './types';

export const createCodeLayout = (
	rendererOptions: CodeRendererOptions,
	layoutOptions?: CodeLayoutOptions,
): CodeLayoutAPI => {
	const render = (lang: string, node: object | object[], linkerContext: object = {}) => {
		const snippetContext: CodeRendererContext = {
			linker: rendererOptions.linker,
			linkerContext,
			columns: layoutOptions?.columns ?? 120,
		};

		const nodes = Array.isArray(node) ? node : [node];

		return nodes.flatMap((n, index) => {
			const layoutGroup = computeLayout(rendererOptions, snippetContext, lang, n);
			const formattedLines = formatLayout(layoutGroup, snippetContext.columns);

			return index === 0 ? formattedLines : [{ indent: 0, content: [] }, ...formattedLines];
		});
	};

	return { render };
};
