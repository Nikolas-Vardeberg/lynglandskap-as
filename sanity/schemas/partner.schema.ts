import { defineType } from 'sanity';
import { pages } from '../constants';

export const partner = defineType({
	name: 'partner',
	type: 'document',
	title: 'Partner',
	fields: [
		{
			name: 'name',
			title: 'Navn',
			type: 'string',
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'teaserText',
			title: 'Teaser tekst',
			type: 'string',
			options: {
				rows: 3,
			},
			description: 'Kort tekst som beskriver partneren',
			validation: (Rule) => Rule.max(120).required(),
		},
		{
			name: 'logo',
			title: 'Logo',
			description: 'Bilde av partnerens logo i SVG-format. (hvit)',
			type: 'image',
		},
		{
			name: 'page',
			title: 'Side',
			description: 'Side for partneren',
			type: 'reference',
            to: pages,
		},
	],
});