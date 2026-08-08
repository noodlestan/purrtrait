import ts from 'typescript';

export function parseSource(source: string): ts.SourceFile {
	return ts.createSourceFile('xpress.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
}
