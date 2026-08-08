import type { CodeRendererContext } from '@purrtrait/code-renderer';

import type { LangTsLayoutContext } from './types';

export const createLangTsLayoutContext = (
	snippetContext: CodeRendererContext,
): LangTsLayoutContext => {
	return {
		snippetContext,
	};
};
