import { type TypescriptComponentNode, extractProps, printNode } from '@purrtrait/client-tsx';
import ts from 'typescript';

import type { TSXView, TSXViewOptions } from '../types';

import { extractComponentName } from './extractComponentName';
import { isTargetAttr } from './isTargetAttr';
import { replaceTarget } from './replaceTarget';

type Result = {
	wrapperAst: ts.Node;
	targets: TSXView['targets'];
};

export function replaceTargets(
	options: TSXViewOptions,
	sourceFile: ts.SourceFile,
	targetNodes: Record<string, TypescriptComponentNode>,
): Result {
	let wrapperAst: ts.Node = sourceFile;

	const targets: TSXView['targets'] = {};

	for (const [key, node] of Object.entries(targetNodes)) {
		const componentName = extractComponentName(node);
		targets[key] = {
			component: {
				name: componentName,
			},
			raw: {
				type: 'jsx',
				tsNode: node,
				serialized: printNode(sourceFile, node),
			},
			props: extractProps(node, sourceFile, attr => isTargetAttr(options, attr)),
		};

		wrapperAst = replaceTarget(options, wrapperAst, node, key, componentName);
	}

	return {
		wrapperAst,
		targets,
	};
}
