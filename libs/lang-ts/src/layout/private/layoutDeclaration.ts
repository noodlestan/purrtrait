import type {
	ComponentDeclaration,
	Declaration,
	FunctionDeclaration,
	InterfaceDeclaration,
	TypeExpressionDeclaration,
} from '@purrception/lang-ts';
import type { CodeLayoutNode } from '@purrtrait/code-renderer';

import type { LangTsLayoutContext } from '../../private';

import {
	layoutComponentDeclaration,
	layoutInterfaceDeclaration,
	layoutTypeDeclaration,
} from './declarations';
import { layoutFunctionDeclaration } from './declarations/layoutFunctionDeclaration';

export function layoutDeclaration(
	context: LangTsLayoutContext,
	declaration: Declaration,
): CodeLayoutNode[] {
	if ('kind' in declaration) {
		switch (declaration.kind) {
			case 'type':
				return layoutTypeDeclaration(context, declaration as TypeExpressionDeclaration);
			case 'function':
				return layoutFunctionDeclaration(context, declaration as FunctionDeclaration);
			case 'component':
				return layoutComponentDeclaration(context, declaration as ComponentDeclaration);
			case 'interface':
				return layoutInterfaceDeclaration(context, declaration as InterfaceDeclaration);
		}
	}
	console.error(`Invalid node:`, declaration);
	throw new Error(`Invalid node.`);
}
