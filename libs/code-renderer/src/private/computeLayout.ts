import type { CodeLayoutNode } from '../structure';
import type { CodeRendererContext, CodeRendererOptions } from '../types';

export function computeLayout(
	rendererContext: CodeRendererOptions,
	snippetContext: CodeRendererContext,
	lang: string,
	node: object,
): CodeLayoutNode[] {
	const langHandler = rendererContext.langs.find(l => l.lang === lang);
	if (!langHandler) {
		throw new Error(`No layout registered for language: ${lang}`);
	}
	return langHandler.layout(snippetContext, node);
}
