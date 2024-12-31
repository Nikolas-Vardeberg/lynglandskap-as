import type { SchemaTypeDefinition } from 'sanity';
import objects from './schemas/objects';
import { homePage } from './schemas/pages/home-page.schema';

export const schemaTypes = [
    homePage,
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