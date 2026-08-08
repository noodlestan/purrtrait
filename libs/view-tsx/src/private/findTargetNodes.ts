import type { TypescriptComponentNode } from '@purrtrait/client-tsx';
import ts from 'typescript';

import type { TSXViewOptions } from '../types';

import { getTargetAttrValue } from './getTargetAttrValue';

export function findTargetNodes(
	options: TSXViewOptions,
	root: ts.SourceFile,
): Record<string, TypescriptComponentNode> {
	const found = new Map<string, TypescriptComponentNode>();

	let index = 1;
	let maybeTarget: TypescriptComponentNode | undefined;
	let registeredTarget: TypescriptComponentNode | undefined;

	function registerTarget(node: TypescriptComponentNode, name: string): boolean {
		if (registeredTarget) {
			console.error(`Nested target "${name}" is not allowed.\n\n${node.getText()}`);
			return false;
		}

		if (found.has(name)) {
			console.error(`Duplicate target "${name}".\n\n${node.getText()}`);
			return false;
		}

		found.set(name, node);
		return true;
	}

	function visit(node: ts.Node) {
		let didRegisterTarget = false;

		if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
			maybeTarget = node;
		} else if (maybeTarget) {
			const targetName = getTargetAttrValue(options, node, String(index));
			if (targetName && registerTarget(maybeTarget, targetName)) {
				index++;
				didRegisterTarget = true;
				registeredTarget = maybeTarget;
			}
		}

		ts.forEachChild(node, visit);
		if (didRegisterTarget) {
			registeredTarget = undefined;
			maybeTarget = undefined;
		}
	}

	visit(root);

	return Object.fromEntries(found);
}
