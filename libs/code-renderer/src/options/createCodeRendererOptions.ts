import type { CodeRendererOptions } from '../types';

export const createCodeRendererOptions = (
	options: Partial<CodeRendererOptions> = {},
): CodeRendererOptions => {
	return {
		langs: options.langs || [],
		linker: options.linker || (() => undefined),
	};
};
