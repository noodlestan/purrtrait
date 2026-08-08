import type { LangTsLayoutContext } from './types';

export const createLangTsLayoutContextWithGenericParams = (
	context: LangTsLayoutContext,
	genericParams: string[] = [],
): LangTsLayoutContext => {
	const existingParams = context.genericParams ?? [];
	return {
		...context,
		genericParams: new Set([...existingParams, ...genericParams]),
	};
};
