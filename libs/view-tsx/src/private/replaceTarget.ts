import {
	type TypescriptComponentNode,
	type TypescriptNode,
	unwrapExtractableNode,
} from '@purrtrait/client-tsx';
import ts from 'typescript';

import type { TSXViewOptions } from '../types';

import { createTSXViewTargetPlaceholder } from './createTSXViewTargetPlaceholder';

export function replaceTarget(
	options: TSXViewOptions,
	root: ts.Node,
	target: TypescriptComponentNode,
	keyValue: string,
	componentName: string,
): TypescriptNode {
	function visit(n: ts.Node): ts.Node {
		if (n === target) {
			return createTSXViewTargetPlaceholder(options, keyValue, componentName);
		}

		return ts.visitEachChild(n, visit, undefined);
	}

	const result = ts.visitNode(root, visit);

	return unwrapExtractableNode(result);
}
