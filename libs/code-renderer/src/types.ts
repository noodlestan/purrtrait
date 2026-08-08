import type { CodeLayoutNode } from './structure';

export type CodeNodeLinker = (linkerContext: object, value: string) => string | undefined;

export type CodeRendererOptions = {
	langs: CodeRendererLanguage[];
	linker: CodeNodeLinker;
};

export type CodeRendererContext = {
	linkerContext: object;
	columns: number;
	linker: CodeNodeLinker;
};

export type CodeRendererLanguage = {
	lang: string;
	name: string;
	layout: (snippetContext: CodeRendererContext, node: object | string) => CodeLayoutNode[];
};
