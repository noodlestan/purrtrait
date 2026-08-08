import type { CodeLayoutAPI } from '@purrtrait/code-renderer';

import type { SolidCodeLayoutOptions } from '../../private';

export type CodeBlockProps = {
	lang: string;
	nodes: object[];
	options: SolidCodeLayoutOptions;
	linkerContext: object;
	render: CodeLayoutAPI['render'];
};
