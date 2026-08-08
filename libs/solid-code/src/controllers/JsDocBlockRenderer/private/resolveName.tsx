/**
 * Derives a display name from a link identifier.
 *
 * Priority order:
 * 1. `alias` if provided
 * 2. Fragment after `#` (e.g. `path/to/module#MyType` → `MyType`)
 * 3. Last segment after `/` (e.g. `path/to/Component` → `Component`)
 * 4. The full `text` as-is
 */
export const resolveName = (text: string, alias?: string): string => {
	if (alias) {
		return alias.trim();
	}

	const hashIndex = text.indexOf('#');
	if (hashIndex !== -1) {
		return text.slice(hashIndex + 1);
	}

	const slashIndex = text.lastIndexOf('/');
	if (slashIndex !== -1) {
		return text.slice(slashIndex + 1);
	}

	return text;
};
