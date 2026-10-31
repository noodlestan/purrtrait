/**
 * A resolved link entry with a display name and target href.
 * */
export type JsDocLinkItem = {
	text: string;
	href: string;
};

/**
 * Options to customise link resolution inside {@link createJsDocBlock}.
 *
 * When an option is omitted the factory uses a reasonable built-in.
 */
export type JsDocLinkResolverOptions = {
	/**
	 * Derive a display name from a link identifier and and optional alias.
	 */
	resolveLinkName?: (text: string, displayName?: string) => string;
	/**
	 * Resolve a link identifier to a href (or `[displayName, href]`).
	 *
	 * Return `undefined` to suppress the link entirely.
	 */
	resolveLink?: (href: string) => string | [displayName: string, href: string] | undefined;
};

export type JsDocLinkResolverAPI = {
	/**
	 *  Description text with `{@link …}` placeholders resolved to markdown syntax
	 * */
	resolveLink: (raw: string) => JsDocLinkItem | undefined;
};
