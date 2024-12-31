import { pages } from '@/sanity/constants';
import { defineType } from 'sanity';

export const internalLink = defineType({
	name: 'internalLink',
	title: 'Internal link',
	type: 'object',
	validation: (Rule) =>
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		Rule.custom((field: any) => {
			if (!field.reference) {
				return 'Interne lenker må inneholde enten en relativ url eller en referanse';
			}
			return true;
		}),
	fields: [
		{
			name: 'text',
			title: 'Tekst',
			type: 'string',
			description: 'Overskriver tittelen på referansen',
		},
		{
			name: 'relativePath',
			title: 'Bruk Relativ url',
			type: 'boolean',
			description:
				'Bruk relativ url i stedet for referanse. Dette betyr å skrive inn url manuelt istedet for å la koden generere den basert på referansen',
			initialValue: false,
		},
		{
			name: 'path',
			title: 'Relativ url',
			type: 'string',
			description: 'Relativ url til siden',
			hidden: ({ parent }) => parent?.relativePath !== true,
		},
		{
			name: 'reference',
			title: 'Referanse',
			type: 'reference',
			to: pages,
			hidden: ({ parent }) => parent?.relativePath === true,
		},
	],
	preview: {
		select: {
			title: 'title',
			alternativeTitle: 'reference.title',
		},
		prepare: ({ title, alternativeTitle }) => {
			return {
				title: title || alternativeTitle,
			};
		},
	},
});