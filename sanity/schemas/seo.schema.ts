import { defineType } from 'sanity';
import { image } from './objects/image.schema';
import SEOReadme from '@/molecules/sanity/SEOReadme';

export const seo = defineType({
	type: 'document',
	name: 'seo',
	title: 'SEO',
	fields: [
		{
			name: 'seoReadme',
			type: 'text',
			title: 'SEO Readme',
			components: {
				field: SEOReadme,
			},
		},
		{
			name: 'title',
			type: 'string',
			title: 'Tittel',
			initialValue: 'Lynglandskap AS',
		},
		{
			name: 'template',
			type: 'string',
			title: 'Template',
			initialValue: '%s | Lynglandskap AS',
			description:
				"Template for SEO tittel, bruk %s for å sette inn tittel, resten av tittelen er statisk. Hvis du har '%s - Lynglandskap' vil tittelen bli 'Tittel - Lynglandskap' på undersider.",
		},
		{
			name: 'description',
			type: 'text',
			title: 'Beskrivelse',
			description: 'Beskrivelse av nettsiden',
			rows: 3,
			validation: (Rule) => Rule.min(70).max(160).warning('Beskrivelsen bør være mellom 70 og 160 tegn'),
		},
		{
			name: 'baseUrl',
			type: 'url',
			title: 'Base URL',
			description: 'Nettstedets base URL',
			initialValue: 'https://lynglandskap.no',
		},
		image({
			name: 'image',
			title: 'Hovedbilde',
		}),
	],
	preview: {
		prepare: () => ({
			title: 'SEO',
		}),
	},
});