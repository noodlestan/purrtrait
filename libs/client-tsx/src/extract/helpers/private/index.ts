// @index(['./*.{ts,tsx}', './!(private|parts|functions)*/index.{ts,tsx}'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './extractAttributeName';
export * from './extractBooleanAttribute';
export * from './extractChildren';
export * from './extractExpressionAttribute';
export * from './extractStringAttribute';
