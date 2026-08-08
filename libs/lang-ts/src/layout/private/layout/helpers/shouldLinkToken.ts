import { isBuiltInToken } from '@purrception/lang-ts';

import type { LangTsLayoutContext } from '../../../../private';

export function shouldLinkToken(context: LangTsLayoutContext, value: string): boolean {
	if (context.genericParams?.has(value)) {
		return false;
	}
	return !isBuiltInToken(value);
}
