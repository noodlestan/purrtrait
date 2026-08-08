// @index(['./*.{ts,tsx}', './!(private|parts|functions)*/index.{ts,tsx}'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './layoutComponentDeclaration';
export * from './layoutTypeDeclaration';
export * from './layoutFunctionDeclaration';
export * from './layoutInterfaceDeclaration';
