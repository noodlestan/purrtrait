import type { CodeLayoutToken } from '@purrtrait/code-renderer';
import type { Component } from 'solid-js';

export type CodeLinkComponent = Component<{
	token: CodeLayoutToken;
}>;

export type SolidCodeLayoutOptions = {
	linkComponent: CodeLinkComponent;
};
