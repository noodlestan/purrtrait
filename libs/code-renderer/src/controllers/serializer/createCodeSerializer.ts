import { renderLines } from '../../private';
import type { CodeRendererContext, CodeRendererOptions } from '../../types';

import { NEW_LINE, serializeLine } from './private';
import type { CodeSerializerAPI, CodeSerializerOptions, CodeSerializerOutput } from './types';

export const createCodeSerializer = (
	rendererOptions: CodeRendererOptions,
	serializerOptions?: CodeSerializerOptions,
): CodeSerializerAPI => {
	const serialize = (
		lang: string,
		node: object | object[],
		linkerContext: object = {},
	): CodeSerializerOutput => {
		const snippetContext: CodeRendererContext = {
			linker: rendererOptions.linker,
			linkerContext,
			columns: serializerOptions?.columns ?? 120,
		};

		const symbols = new Map<string, string>();

		const lines = renderLines(rendererOptions, snippetContext, lang, node);
		const code = lines.map(line => serializeLine(line, symbols)).join(NEW_LINE);

		return { code, symbols };
	};

	return { serialize };
};
