import type { CodeLayoutLine } from '../../structure';

export type CodeLayoutOptions = {
	columns?: number;
};

export type CodeLayoutAPI = {
	render: (lang: string, node: object | object[], linkerContext: object) => CodeLayoutLine[];
};
