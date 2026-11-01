import { createCodeRendererOptions, createCodeSerializer } from '@purrtrait/code-renderer';
import { PurrceptionLanguageId, tsCodeLayout } from '@purrtrait/lang-ts';

import type { SerializeDeclarationOptions } from './types';

export function serializeDeclaration(
	nodes: object | object[],
	options?: SerializeDeclarationOptions,
): string {
	const codeRendererOptions = createCodeRendererOptions({
		langs: [tsCodeLayout],
		linker: () => undefined,
	});
	const serializer = createCodeSerializer(codeRendererOptions, { columns: options?.columns });
	const output = serializer.serialize(PurrceptionLanguageId, nodes, options?.context);

	return output.code;
}
