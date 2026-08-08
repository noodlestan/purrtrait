import type { CodeLayoutToken } from '@purrtrait/code-renderer';
import type { Component } from 'solid-js';

export const SolidCodeLinkDefault: Component<{ token: CodeLayoutToken }> = props => {
	return <a href={props.token.link}>{props.token.value}</a>;
};
