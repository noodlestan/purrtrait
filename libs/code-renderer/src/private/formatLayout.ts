import type { CodeLayoutLine, CodeLayoutNode } from '../structure';

import { formatNodes } from './private';

export const formatLayout = (nodes: CodeLayoutNode[], cols = 60, indent = 0): CodeLayoutLine[] =>
	formatNodes(nodes, cols, indent);
