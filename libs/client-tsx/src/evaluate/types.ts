// WIP This contract is a duplication from in @purrpose/client-babel but it is unreasonable to depend on that package here.

export type IDebugOption = boolean | string | undefined;

export type ICompilerScope = Record<string, unknown>;

export type ICompiler = {
	compile: (code: string) => string;
	execute: (code: string, scope: ICompilerScope) => unknown;
};

export type ICompilerHelpers = {
	evaluateComponent: <T>(body: string | undefined, jsx: string, scope: ICompilerScope) => T;
	evaluateExpression: <T>(expression: string, scope: ICompilerScope) => T;
	evaluateHandler: <T>(handler: string, debug: IDebugOption, scope: ICompilerScope) => T;
};

export type ICompilerAPI = ICompiler & ICompilerHelpers;
