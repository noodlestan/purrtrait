import type { FunctionDeclaration, TypeExpressionDeclaration } from '@purrception/lang-ts';
import { PurrceptionLanguageId } from '@purrtrait/lang-ts';
import { describe, expect, it } from 'vitest';

import { serializeDeclaration } from './index';

const makeFunctionDeclarationFixture = (): FunctionDeclaration => {
	return {
		at: 'fixture.ts#joinPath',
		lang: PurrceptionLanguageId,
		name: 'joinPath',
		private: false,
		kind: 'function',
		node: {
			kind: 'function',
			description: 'Joins two path segments.',
			params: [{ name: 'left', type: { kind: 'primitive', primitive: 'string' } }],
			returns: { type: { kind: 'primitive', primitive: 'string' } },
		},
	};
};

const makeTypeDeclarationFixture = (): TypeExpressionDeclaration => {
	return {
		at: 'fixture.ts#UserProps',
		lang: PurrceptionLanguageId,
		name: 'UserProps',
		private: false,
		kind: 'type',
		node: {
			kind: 'object',
			members: {
				name: { type: { kind: 'primitive', primitive: 'string' } },
				author: { type: { kind: 'ref', ref: 'UserRef' } },
			},
		},
	};
};

describe('serializeDeclaration', () => {
	it('FOR a function declaration it serializes the function signature', () => {
		const declaration = makeFunctionDeclarationFixture();

		const code = serializeDeclaration(declaration);

		expect(code).toContain('function');
		expect(code).toContain('joinPath');
	});

	it('FOR a type declaration it serializes the object type', () => {
		const declaration = makeTypeDeclarationFixture();

		const code = serializeDeclaration(declaration);

		expect(code).toContain('UserProps');
		expect(code).toContain('{');
		expect(code).toContain('}');
	});

	it('WHEN options are provided it honours the columns and context values', () => {
		const declaration = makeTypeDeclarationFixture();

		const code = serializeDeclaration(declaration, { columns: 40, context: { base: 'docs' } });

		expect(code).toContain('UserProps');
	});
});
