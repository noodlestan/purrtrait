import {
	type TSXElementNode,
	type TypescriptElementNode,
	parseSource,
	printNode,
} from '@purrtrait/client-tsx';

import { createOptions, findTargetNodes, replaceTargets, wrapSourceInFragment } from './private';
import type { TSXView, TSXViewOptions } from './types';

export function extractTSXView(source: string, opts?: Partial<TSXViewOptions>): TSXView {
	const options = createOptions(opts);
	const code = wrapSourceInFragment(source);
	const sourceFile = parseSource(code);
	const targetNodes = findTargetNodes(options, sourceFile);

	if (!Object.keys(targetNodes).length) {
		throw new Error('No target node found');
	}

	const { wrapperAst, targets } = replaceTargets(options, sourceFile, targetNodes);

	const wrapper: TSXElementNode = {
		type: 'jsx',
		tsNode: wrapperAst as TypescriptElementNode,
		serialized: printNode(sourceFile, wrapperAst),
	};

	return {
		source,
		wrapper,
		targets,
	};
}
