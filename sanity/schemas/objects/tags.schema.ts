import { defineField } from 'sanity';

export const tags = (options: { group?: string; description?: string }) =>
	defineField({
		type: 'array',
		name: 'tags',
		title: 'Tags',
		of: [
			{
				type: 'reference',
				to: [{ type: 'tag' }],
			},
		],
		validation: (Rule) => Rule.min(0).max(3),
		...options,
	});