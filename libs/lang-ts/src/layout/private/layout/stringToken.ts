import type { CodeLayoutToken } from '@purrtrait/code-renderer';

export function stringToken(value: string): CodeLayoutToken<'string'> {
	return { type: 'token', kind: 'string', value };
}
