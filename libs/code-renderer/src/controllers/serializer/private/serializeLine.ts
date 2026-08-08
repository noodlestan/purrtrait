import type { CodeLayoutLine } from '../../../structure';

export function serializeLine(line: CodeLayoutLine, symbols: Map<string, string>): string {
	const indent = '  '.repeat(line.indent);
	const content = line.content
		.map(token => {
			if (token.link) {
				symbols.set(token.value, token.link);
			}
			return token.value;
		})
		.join('');
	return indent + content;
}
