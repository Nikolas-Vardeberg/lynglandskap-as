import type { SchemaTypeDefinition } from 'sanity';
import objects from './schemas/objects';

export const schemaTypes = [
	...objects,
];

export const schema: {
	types: SchemaTypeDefinition[];
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	templates: (prev: any[]) => any[];
} = {
	types: schemaTypes,
	templates: (prev) => [...prev],
};