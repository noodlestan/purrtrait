import type { JsDocData } from '@purrception/lang-ts';

import { type JsDocLinkItem, createJsDocLinkResolver } from '../JsDocLinkResolver';

import type { JsDocBlockRendererAPI, JsDocBlockRendererOptions } from './types';

/**
 * Creates a description API from a JsDoc AST node.
 *
 * Parses `@link` tags and inline `{@link …}` placeholders, resolving them
 * through the provided (or built-in) `linkResolver`
 *
 * All three accessors — `links`, `tags`, `description` — are memoised.
 */
export const createJsDocBlockRenderer = (
	options: JsDocBlockRendererOptions = {},
): JsDocBlockRendererAPI => {
	const linkResolver = options.linkResolver ?? createJsDocLinkResolver();

	const serializeLink = (text: string, href: string): string | undefined => {
		return options.serializeLink ? options.serializeLink?.(text, href) : `[${text}](${href})`;
	};

	const links = (node: JsDocData) => {
		// eslint-disable-next-line dot-notation
		const link = node.tags?.['link'];
		if (!link) {
			return [];
		}

		const items = typeof link === 'string' ? [link] : link;
		const result: JsDocLinkItem[] = [];

		for (const item of items) {
			const resolved = linkResolver.resolveLink(item);
			if (resolved) {
				result.push(resolved);
			}
		}

		return result;
	};

	const tags = (node: JsDocData) => {
		return Object.entries(node.tags || {}).filter(([key]) => key !== 'link');
	};

	const description = (node: JsDocData) => {
		const desc = node.description;
		if (!desc) {
			return undefined;
		}

		const parts: string[] = [];
		let offset = 0;

		for (const match of desc.matchAll(/\{@link\s+([^}]+)\}/g)) {
			const [full, rawTarget] = match;
			const index = match.index ?? 0;
			parts.push(desc.slice(offset, index));

			if (rawTarget) {
				const resolved = linkResolver.resolveLink(rawTarget);

				if (!resolved) {
					parts.push(rawTarget);
					continue;
				}
				const serialized = serializeLink(resolved.text, resolved.href);
				if (!serialized) {
					parts.push(resolved.text);
					continue;
				}
				parts.push(serialized);
			}

			offset = index + full.length;
		}

		parts.push(desc.slice(offset));
		return parts.join('');
	};

	return {
		links,
		tags,
		description,
	};
};
