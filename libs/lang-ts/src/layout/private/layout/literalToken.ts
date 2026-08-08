import type { CodeLayoutToken } from '@purrtrait/code-renderer';

export function literalToken(value: string | number | boolean): CodeLayoutToken<'literal'> {
	return {
		type: 'token',
		kind: 'literal',
		value: typeof value === 'string' ? JSON.stringify(value) : String(value),
	};
}
