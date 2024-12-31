import { apiVersion } from '@/sanity/env';
import type { Page } from '@/types/root.types';
import { type SanityDocument, groq } from 'next-sanity';
import { defineField } from 'sanity';

const RESERVED_SLUGS = ['api', "studio", "artikler", "kundecaser"];
const MAX_CARACTER = 155;

export const slug = (
	refField = 'title',
	options?: {
		group?: string;
	},
) =>
	defineField({
		type: 'slug',
		name: 'slug',
		title: 'Slug',
		description:
			'Brukes som unik identifikator i url. Kan kun inneholde bokstaver, tall, understrek og bindestrek.',
		options: {
			source: refField,
			maxLength: MAX_CARACTER,
			isUnique: async (slug, context) => {
				// Search for all documents with the same slug
				const query = groq`*[_type == $type && !(_id in path("drafts.**")) && slug.current == $slug]{_id, title }`;

				const documents = await context.getClient({ apiVersion }).fetch<Page[]>(query, {
					slug,
					type: context.document?._type,
				});

				// Returns true if no documents are found, false otherwise
				return documents.length <= 1;
			},
		},
		validation: (Rule) => [
			Rule.required(),
			Rule.custom((value) => {
				const slug = value?.current as string;
				const slugRegex = new RegExp(/^[a-z0-9]+(?:[-_]+[a-z0-9]+)*$/);

				if (!slug) return 'Slug kan ikke være tom.';

				if (RESERVED_SLUGS.includes(slug))
					return `Slug kan ikke være lik "${slug}" da dette er en reservert url.`;

				if (slug.length > MAX_CARACTER) {
					return `Slug kan ikke være lengre enn ${MAX_CARACTER} tegn.`;
				}

				return slugRegex.test(slug)
					? true
					: 'Slug kan kun inneholde små bokstaver, tall, understrek og bindestrek.';
			}),
		],
		...options,
	});