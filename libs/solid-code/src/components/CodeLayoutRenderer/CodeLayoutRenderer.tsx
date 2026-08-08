import { type Component, For } from 'solid-js';

import { renderLine } from '../../private';

import type { CodeLayoutRendererProps } from './types';

export const CodeLayoutRenderer: Component<CodeLayoutRendererProps> = (
	props: CodeLayoutRendererProps,
) => {
	return <For each={props.lines}>{line => renderLine(props.options, line)}</For>;
};
