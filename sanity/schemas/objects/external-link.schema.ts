import { defineType } from 'sanity';

export const externalLink = defineType({
	name: 'externalLink',
	title: 'External link',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Tittel',
			type: 'string',
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'url',
			title: 'URL',
			type: 'url',
			validation: (Rule) => [
				Rule.required(),
				Rule.uri({
					scheme: ['https', 'mailto', 'tel'],
				}).error('URL must be a valid URL'),
			],
			options: {
				aiAssist: { exclude: true },
			},
		},
	],
});