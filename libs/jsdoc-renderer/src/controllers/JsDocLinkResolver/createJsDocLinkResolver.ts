import { resolveName, resolveNameAndAlias } from './private';
import type { JsDocLinkItem, JsDocLinkResolverAPI, JsDocLinkResolverOptions } from './types';

export const createJsDocLinkResolver = (
	options: JsDocLinkResolverOptions = {},
): JsDocLinkResolverAPI => {
	const resolveLinkName = (displayName: string, alias?: string): string => {
		return options.resolveLinkName
			? options.resolveLinkName(displayName, alias)
			: resolveName(displayName, alias);
	};

	const resolveLinkHref = (
		text: string,
	): string | [displayName: string, href: string] | undefined => {
		return options.resolveLink ? options.resolveLink(text) : text;
	};

	const resolveLink = (raw: string): JsDocLinkItem | undefined => {
		const [text, alias] = resolveNameAndAlias(raw);
		const hrefResult = resolveLinkHref(text);
		if (hrefResult === undefined) {
			return undefined;
		}

		if (Array.isArray(hrefResult)) {
			const [resolvedDisplayName, href] = hrefResult;
			return {
				text: alias ?? resolvedDisplayName,
				href,
			};
		}

		return {
			text: resolveLinkName(text, alias),
			href: hrefResult,
		};
	};

	return {
		resolveLink,
	};
};
