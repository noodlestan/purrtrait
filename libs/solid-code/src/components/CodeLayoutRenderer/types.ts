import type { CodeLayoutLine } from '@purrtrait/code-renderer';

import type { SolidCodeLayoutOptions } from '../../private';

export type CodeLayoutRendererProps = {
	lines: CodeLayoutLine[];
	options: SolidCodeLayoutOptions;
};
