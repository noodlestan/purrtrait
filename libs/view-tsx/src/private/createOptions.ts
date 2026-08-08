import {
	PLACEHOLDER_COMPONENT_PROP,
	PLACEHOLDER_KEY_PROP,
	PLACEHOLDER_NAME,
	PLACEHOLDER_PROPS_PROP,
	TARGET_ATTRIBUTE_NAME,
} from '../constants';
import type { TSXViewOptions } from '../types';

export function createOptions(opt: Partial<TSXViewOptions> = {}): TSXViewOptions {
	return {
		targetAttributeName: opt.targetAttributeName ?? TARGET_ATTRIBUTE_NAME,
		placeholderName: opt.placeholderName ?? PLACEHOLDER_NAME,
		placeholderKeyProp: opt.placeholderKeyProp ?? PLACEHOLDER_KEY_PROP,
		placeholderComponentProp: opt.placeholderComponentProp ?? PLACEHOLDER_COMPONENT_PROP,
		placeholderPropsProp: opt.placeholderPropsProp ?? PLACEHOLDER_PROPS_PROP,
		placeholderPropsVar: opt.placeholderPropsVar ?? PLACEHOLDER_PROPS_PROP,
	};
}
