/**
 * Splits a raw link string into its identifier and optional alias.
 *
 * The alias is anything after the first space (e.g. `component:Button My Button`).
 * Returns `[identifier, alias]` or `[raw, undefined]` if no space is found.
 */
export const resolveNameAndAlias = (raw: string): [text: string, alias: string | undefined] => {
	const index = raw.indexOf(' ');
	if (index === -1) {
		return [raw, undefined];
	}
	const text = raw.slice(0, index).trim();
	const alias = raw.slice(index + 1).trim();
	return [text, alias || undefined];
};
