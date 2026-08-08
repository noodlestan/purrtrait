// @index(['./*.{ts,tsx}', './!(private|parts|functions)*/index.{ts,tsx}'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './finalizeLine';
export * from './formatNodes';
export * from './getLength';
export * from './trimSpaces';
export * from './tryInline';
