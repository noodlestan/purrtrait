import type { PropEvaluator, TSXView, ViewTargetPropsTransformed } from '../types';

export function viewPropsByTarget(
	view: TSXView,
	evaluate: PropEvaluator,
): Record<string, ViewTargetPropsTransformed> {
	const targetEntries = Object.entries(view.targets);
	const propEntries = targetEntries.map(([key, target]) => {
		const targetPropEntries = Object.entries(target.props ?? {});
		const evaluatedEntries = targetPropEntries.map(entry => [entry[0], evaluate([...entry, key])]);
		return [key, Object.fromEntries(evaluatedEntries)];
	});
	return Object.fromEntries(propEntries);
}
