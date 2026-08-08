import type { CodeLayoutToken } from '@purrtrait/code-renderer';

import type { LangTsLayoutContext } from '../../../private';

import { shouldLinkToken } from './helpers';

export function typeRefToken(
	context: LangTsLayoutContext,
	value: string,
): CodeLayoutToken<'type-ref'> {
	const target = shouldLinkToken(context, value)
		? context.snippetContext.linker(context.snippetContext.linkerContext, value)
		: undefined;

	return { type: 'token', kind: 'type-ref', value, link: target };
}
