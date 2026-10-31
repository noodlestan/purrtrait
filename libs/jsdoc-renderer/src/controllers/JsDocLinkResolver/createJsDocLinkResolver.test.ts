import { describe, expect, it } from 'vitest';

import { createJsDocLinkResolver } from './createJsDocLinkResolver';

describe('createJsDocLinkResolver', () => {
	it('WHEN the raw link carries an alias the alias wins as the display name', () => {
		const resolver = createJsDocLinkResolver();

		const result = resolver.resolveLink('path/to/Thing My Alias');

		expect(result).toEqual({ text: 'My Alias', href: 'path/to/Thing' });
	});

	it('WHEN the raw link carries a fragment the fragment becomes the display name', () => {
		const resolver = createJsDocLinkResolver();

		const result = resolver.resolveLink('path/to/module#MyType');

		expect(result).toEqual({ text: 'MyType', href: 'path/to/module#MyType' });
	});

	it('WHEN the raw link carries segments the last segment becomes the display name', () => {
		const resolver = createJsDocLinkResolver();

		const result = resolver.resolveLink('path/to/Component');

		expect(result).toEqual({ text: 'Component', href: 'path/to/Component' });
	});

	it('WHEN the injected resolveLink returns a tuple the tuple display name is used', () => {
		const resolver = createJsDocLinkResolver({
			resolveLink: () => ['Custom Name', '/custom'],
		});

		const result = resolver.resolveLink('path/to/Thing');

		expect(result).toEqual({ text: 'Custom Name', href: '/custom' });
	});

	it('WHEN the injected resolveLink returns a tuple and an alias is present the alias wins', () => {
		const resolver = createJsDocLinkResolver({
			resolveLink: () => ['Custom Name', '/custom'],
		});

		const result = resolver.resolveLink('path/to/Thing My Alias');

		expect(result).toEqual({ text: 'My Alias', href: '/custom' });
	});

	it('WHEN the injected resolveLink returns undefined the link is suppressed', () => {
		const resolver = createJsDocLinkResolver({ resolveLink: () => undefined });

		const result = resolver.resolveLink('path/to/Thing');

		expect(result).toBeUndefined();
	});
});
