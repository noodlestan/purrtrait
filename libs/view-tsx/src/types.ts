import type { TSXElementNode, TSXNode } from '@purrtrait/client-tsx';

export type TSXViewOptions = {
	placeholderName: string;
	targetAttributeName: string;
	placeholderKeyProp: string;
	placeholderComponentProp: string;
	placeholderPropsProp: string;
	placeholderPropsVar: string;
};

export type ViewTargetPropsRaw = Record<string, TSXNode>;

export type ViewTargetPropsTransformed = Record<string, unknown>;

export type TSXViewTarget = {
	component: {
		name: string;
	};
	raw: TSXElementNode;
	props: Record<string, TSXNode>;
};

export type TSXView = {
	source: string;
	wrapper: TSXElementNode;
	targets: {
		[key: string]: TSXViewTarget;
	};
};

export type PropEvaluator = (entry: [name: string, node: TSXNode, targetKey: string]) => unknown;
