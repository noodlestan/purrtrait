import { describe, expect, it } from 'vitest';

import { escapeHtml } from './index';

describe('escapeHtml', () => {
	it('FOR a value containing markup characters it escapes each of them', () => {
		const value = '<a href="x"> & y';

		const result = escapeHtml(value);

		expect(result).toBe('&lt;a href=&quot;x&quot;&gt; &amp; y');
	});

	it('FOR a value without markup characters it returns the value unchanged', () => {
		const result = escapeHtml('plain text');

		expect(result).toBe('plain text');
	});
});
