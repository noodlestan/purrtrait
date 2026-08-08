import { type Component } from 'solid-js';

import { CodeLayoutRenderer } from '../CodeLayoutRenderer';

import type { CodeBlockProps } from './types';

export const CodeBlock: Component<CodeBlockProps> = props => {
	const lines = () => props.render(props.lang, props.nodes, props.linkerContext);

	return <CodeLayoutRenderer lines={lines()} options={props.options} />;
};
