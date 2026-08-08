import type { CodeLayoutNode } from '@purrtrait/code-renderer';

import type { LangTsLayoutContext } from '../../../private';

type LayoutItemFunction<T> = (context: LangTsLayoutContext, item: T) => CodeLayoutNode[];
type LayoutSeparatorFunction = () => CodeLayoutNode[];

export function eachExpression<T>(
	context: LangTsLayoutContext,
	items: T[] = [],
	layoutItem: LayoutItemFunction<T>,
	layoutSeparator?: LayoutSeparatorFunction,
): CodeLayoutNode[] {
	return Object.values(items).flatMap((item, i, arr) => [
		...layoutItem(context, item),
		...(i < arr.length - 1 && layoutSeparator ? layoutSeparator() : []),
	]);
}
