import ts from 'typescript';

import type { TSXViewOptions } from '../types';

export function isTargetAttr(options: TSXViewOptions, attr: ts.JsxAttribute): boolean {
	return ts.isIdentifier(attr.name) && attr.name.text === options.targetAttributeName;
}
