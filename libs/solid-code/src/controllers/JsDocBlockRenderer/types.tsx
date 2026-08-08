import type { JsDocData } from '@purrception/lang-ts';

import type { JsDocLinkItem, JsDocLinkResolverAPI } from '../JsDocLinkResolver';

/**
 * A JSDoc tag entry: `[tagName, valueOrValues]`.
 * */
export type TagItem = [string, string | string[]];

/**
 * Options to customise link resolution inside {@link createJsDocBlockRenderer}.
 *
 * When an option is omitted the factory uses a reasonable built-in.
 */
export type JsDocBlockRendererOptions = {
	/**
	 * Resolves links
	 */
	linkResolver?: JsDocLinkResolverAPI;
	/**
	 * Format a resolved link as a markdown-like expression.
	 *
	 * Receives the final display name and href. Return `undefined` to render
	 * the name as plain text instead.
	 *
	 * @default `[${text}](${href})`
	 */
	serializeLink?: (text: string, href: string) => string | undefined;
};

export type JsDocBlockRendererAPI = {
	/**
	 * Tag-level links (from `@link`).
	 * */
	links: (node: JsDocData) => JsDocLinkItem[];
	/**
	 * All tags except `@link`.
	 * */
	tags: (node: JsDocData) => TagItem[];
	/**
	 *  Description text with `{@link …}` placeholders resolved to markdown syntax
	 * */
	description: (node: JsDocData) => string | undefined;
};
