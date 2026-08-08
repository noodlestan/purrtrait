import type { CodeLayoutLine, CodeLayoutToken } from '@purrtrait/code-renderer';
import { For, type JSX } from 'solid-js';

import type { SolidCodeLayoutOptions } from './types';

function renderToken(options: SolidCodeLayoutOptions, token: CodeLayoutToken): JSX.Element {
	return (
		<span class={`token ${token.kind}`}>
			{token.link ? options.linkComponent({ token }) : token.value}
		</span>
	);
}

export function renderLine(options: SolidCodeLayoutOptions, line: CodeLayoutLine): JSX.Element {
	return (
		<div class="code-line">
			<span class="indent">{' '.repeat(line.indent * 2)}</span>
			<For each={line.content}>{token => renderToken(options, token)}</For>
		</div>
	);
}
