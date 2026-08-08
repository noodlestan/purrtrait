import type { CodeRendererContext } from '@purrtrait/code-renderer';

export type LangTsLayoutContext = {
	snippetContext: CodeRendererContext;
	genericParams?: Set<string>;
};
