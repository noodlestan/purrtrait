import type { CodeLayoutToken } from '@purrtrait/code-renderer';

export function keywordToken(value: string): CodeLayoutToken<'keyword'> {
	return { type: 'token', kind: 'keyword', value };
}
