import { TagIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const tag = defineType({
	name: 'tag',
	title: 'Tag',
	description: 'Tagger skal være generisk og ikke for detaljerte for å unngå tagg-jungel.',
	type: 'document',
	// @ts-ignore
	icon: TagIcon,
	fields: [
		{
			name: 'title',
			description: 'Taggen vil presenteres som "#[tag tittel]" på siden.',
			title: 'Tittel',
			type: 'internationalizedArrayString',
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title.[0].value',
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'category',
			title: 'Category',
			type: 'reference',
			to: [{ type: 'tagCategory' }],
			validation: (Rule) => Rule.required(),
		},
	],
	preview: {
		select: {
			title: 'title.[0].value',
			subtitle: 'category.title.[0].value',
		},
		prepare(selection) {
			const { title, subtitle } = selection;
			return {
				title: title ? title : 'Untitled',
				subtitle: subtitle ? subtitle : '! No category',
			};
		},
	},
});