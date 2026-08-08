import type { PropEvaluator, TSXView, ViewTargetPropsTransformed } from '../types';

export function viewTargetProps(
	view: TSXView,
	target: string,
	evaluate: PropEvaluator,
): ViewTargetPropsTransformed {
	const targetProps = view.targets[target]?.props || {};
	const evaluatedEntries = Object.entries(targetProps).map(entry => [
		entry[0],
		evaluate([...entry, target]),
	]);
	return Object.fromEntries(evaluatedEntries);
}
