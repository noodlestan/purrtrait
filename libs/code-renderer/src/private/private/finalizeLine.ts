import type { CodeLayoutLine, CodeLayoutToken } from '../../structure';

import { trimSpaces } from './trimSpaces';

export function finalizeLine(
	indent: number,
	tokens: CodeLayoutToken[],
): CodeLayoutLine | undefined {
	const trimmed = trimSpaces(tokens);
	if (trimmed.length === 0) {
		return undefined;
	}
	return { indent, content: trimmed };
}
