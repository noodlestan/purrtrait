import type { CodeLayoutToken } from '../../structure';

export function getLength(tokens: CodeLayoutToken[]): number {
	return tokens.reduce((acc, t) => {
		return acc + t.value.length;
	}, 0);
}
