import type { CodeLayoutGroup, CodeLayoutNode } from '@purrtrait/code-renderer';

export function block(content: CodeLayoutGroup[]): CodeLayoutNode {
	return { type: 'block', content };
}
