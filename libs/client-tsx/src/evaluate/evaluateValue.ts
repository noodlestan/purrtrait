import type { TSXNode } from '../nodes/types';

import type { ICompilerAPI, ICompilerScope } from './types';

export function evaluateValue<T>(
	compiler: ICompilerAPI,
	value: TSXNode,
	scope: ICompilerScope,
	debug?: boolean | string | undefined,
): () => T | (() => void) | unknown {
	switch (value.type) {
		case 'handler':
			return () => compiler.evaluateHandler(value.serialized, debug, scope);

		case 'jsx':
			return compiler.evaluateExpression(`() => (${value.serialized})`, scope);

		case 'expression':
			return compiler.evaluateExpression(`() => (${value.serialized})`, scope);
	}
}
