import type { CodeLayoutGroup, CodeLayoutNode } from '@purrtrait/code-renderer';

export function group(content: CodeLayoutNode[]): CodeLayoutGroup {
	return { type: 'group', content };
}
