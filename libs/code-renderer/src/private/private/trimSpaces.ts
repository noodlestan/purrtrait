import type { CodeLayoutToken } from '../../structure';

export function trimSpaces(tokens: CodeLayoutToken[]): CodeLayoutToken[] {
	let start = 0;
	while (start < tokens.length && tokens[start]?.kind === 'space') {
		start++;
	}

	let end = tokens.length;
	while (end > start && tokens[end - 1]?.kind === 'space') {
		end--;
	}

	return tokens.slice(start, end);
}
