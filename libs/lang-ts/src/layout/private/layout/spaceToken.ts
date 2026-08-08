import type { CodeLayoutToken } from '@purrtrait/code-renderer';

export function spaceToken(): CodeLayoutToken<'space'> {
	return { type: 'token', kind: 'space', value: ' ' };
}
