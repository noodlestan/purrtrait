import ts from 'typescript';

export function printNode(sourceFile: ts.SourceFile, node: ts.Node): string {
	const printer = ts.createPrinter();
	return printer.printNode(ts.EmitHint.Unspecified, node, sourceFile);
}
