import type AST from "./ast";

export interface VersionResponse {
	success: true;
	version: string;
	data: AST.Root;
}

export interface VersionsResponse {
	success: true;
	data: VersionsResponseData;
}

export interface VersionsResponseData {
	all: Array<string>;
	supported: Array<string>;
}

export interface SearchResponse {
	success: true;
	data: SearchResponseData;
}

export interface SearchResponseData {
	classes: Array<AST.ClassDefinition>;
	events: Array<AST.EventDefinitionWithClass>;
	methods: Array<AST.MethodDefinitionWithClass>;
	properties: Array<AST.PropertyDefinitionWithClass>;
}
