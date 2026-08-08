export type CodeSerializerOptions = {
	columns?: number;
};

export type CodeSerializerOutput = {
	code: string;
	symbols: Map<string, string>;
};

export type CodeSerializerAPI = {
	serialize: (
		lang: string,
		node: object | object[],
		linkerContext?: object,
	) => CodeSerializerOutput;
};
