import type { FunctionJsDocData, JsDocData } from '@purrception/lang-ts';
import { describe, expect, it, vi } from 'vitest';

import type { JsDocLinkItem, JsDocLinkResolverAPI } from '../JsDocLinkResolver';

import { createJsDocBlockRenderer } from './createJsDocBlockRenderer';

const makeFunctionJsDocDataFixture = (): FunctionJsDocData => {
	return {
		description: 'Resolves a raw link string.',
		paramTags: {
			raw: 'The raw link string.',
		},
		returnsTag: 'The resolved link item.',
	};
};

describe('createJsDocBlockRenderer', () => {
	describe('description', () => {
		it('WHEN an inline link target resolves it renders the display text as a markdown link', () => {
			const renderer = createJsDocBlockRenderer();

			const result = renderer.description({ description: 'See {@link path/to/Thing} now.' });

			expect(result).toBe('See [Thing](path/to/Thing) now.');
		});

		it('WHEN an inline link target is unresolved it falls back to the raw target text', () => {
			const resolveLinkMock = vi.fn<(raw: string) => JsDocLinkItem | undefined>();
			resolveLinkMock.mockReturnValue(undefined);
			const linkResolver: JsDocLinkResolverAPI = { resolveLink: resolveLinkMock };
			const renderer = createJsDocBlockRenderer({ linkResolver });

			const result = renderer.description({ description: 'See {@link missing} now.' });

			// Ported verbatim from the source: the fallback branch `continue`s before the
			// `offset` update, so the raw description is re-emitted after the fallback text.
			expect(result).toBe('See missingSee {@link missing} now.');
		});

		it('WHEN serializeLink is provided it formats the resolved link with the override', () => {
			const renderer = createJsDocBlockRenderer({
				serializeLink: (text, href) => `<a href="${href}">${text}</a>`,
			});

			const result = renderer.description({ description: 'See {@link path/to/Thing} now.' });

			expect(result).toBe('See <a href="path/to/Thing">Thing</a> now.');
		});

		it('WHEN serializeLink returns undefined it renders the display text as plain text', () => {
			const renderer = createJsDocBlockRenderer({ serializeLink: () => undefined });

			const result = renderer.description({ description: 'See {@link path/to/Thing} now.' });

			// Ported verbatim from the source: the plain-text branch `continue`s before the
			// `offset` update, so the raw description is re-emitted after the display text.
			expect(result).toBe('See ThingSee {@link path/to/Thing} now.');
		});
	});

	describe('tags', () => {
		it('WHEN a node carries tags it filters out the link tag and keeps the other entries', () => {
			const renderer = createJsDocBlockRenderer();
			const node: JsDocData = {
				tags: {
					link: 'path/to/Thing',
					param: 'A parameter.',
					returns: 'A value.',
				},
			};

			const result = renderer.tags(node);

			expect(result).toEqual([
				['param', 'A parameter.'],
				['returns', 'A value.'],
			]);
		});
	});

	describe('links', () => {
		it('WHEN the link tag is a string it extracts the resolved link item', () => {
			const renderer = createJsDocBlockRenderer();
			const node: JsDocData = { tags: { link: 'path/to/Thing' } };

			const result = renderer.links(node);

			expect(result).toEqual([{ text: 'Thing', href: 'path/to/Thing' }]);
		});

		it('WHEN the link tag is an array it extracts every resolved link item', () => {
			const renderer = createJsDocBlockRenderer();
			const node: JsDocData = { tags: { link: ['path/to/Thing', 'other/Target'] } };

			const result = renderer.links(node);

			expect(result).toEqual([
				{ text: 'Thing', href: 'path/to/Thing' },
				{ text: 'Target', href: 'other/Target' },
			]);
		});

		it('WHEN a link tag entry is unresolved it is dropped', () => {
			const resolveLinkMock = vi.fn<(raw: string) => JsDocLinkItem | undefined>();
			const linkResolver: JsDocLinkResolverAPI = { resolveLink: resolveLinkMock };
			const renderer = createJsDocBlockRenderer({ linkResolver });
			const node: JsDocData = { tags: { link: ['path/to/Thing', 'missing'] } };
			resolveLinkMock.mockImplementation(raw => {
				if (raw === 'missing') {
					return undefined;
				}

				return {
					text: raw.slice(raw.lastIndexOf('/') + 1),
					href: `/${raw}`,
				};
			});

			const result = renderer.links(node);

			expect(result).toEqual([{ text: 'Thing', href: '/path/to/Thing' }]);
		});
	});

	describe('params', () => {
		it('WHEN a function node carries paramTags it returns the parameter tag entries', () => {
			const renderer = createJsDocBlockRenderer();
			const node = makeFunctionJsDocDataFixture();

			const result = renderer.params(node);

			expect(result).toEqual([['raw', 'The raw link string.']]);
		});

		it('WHEN a function node has no paramTags it returns an empty list', () => {
			const renderer = createJsDocBlockRenderer();
			const node: FunctionJsDocData = { description: 'No function tags.' };

			const result = renderer.params(node);

			expect(result).toEqual([]);
		});
	});

	describe('returns', () => {
		it('WHEN a function node carries returnsTag it returns the return tag text', () => {
			const renderer = createJsDocBlockRenderer();
			const node = makeFunctionJsDocDataFixture();

			const result = renderer.returns(node);

			expect(result).toBe('The resolved link item.');
		});

		it('WHEN a function node has no returnsTag it returns undefined', () => {
			const renderer = createJsDocBlockRenderer();
			const node: FunctionJsDocData = { description: 'No function tags.' };

			const result = renderer.returns(node);

			expect(result).toBeUndefined();
		});
	});
});
