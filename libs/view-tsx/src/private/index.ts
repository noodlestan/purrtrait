// @index(['./*.{ts,tsx}', './!(private|parts|functions)*/index.{ts,tsx}'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './createOptions';
export * from './createTSXViewTargetPlaceholder';
export * from './extractComponentName';
export * from './findTargetNodes';
export * from './getTargetAttrValue';
export * from './isTargetAttr';
export * from './replaceTarget';
export * from './replaceTargets';
export * from './wrapFragment';
