import type ts from 'typescript';

export type TypescriptComponentNode = ts.JsxElement | ts.JsxSelfClosingElement;

export type TypescriptElementNode = TypescriptComponentNode | ts.JsxFragment;

export type TypescriptFunctionNode = ts.FunctionExpression | ts.ArrowFunction;

export type TypescriptExpressionNode = ts.Expression;

export type TypescriptNode =
	| TypescriptElementNode
	| TypescriptFunctionNode
	| TypescriptExpressionNode;
