import { LI } from '@/atoms/icon';
import { ContainerIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const tagCategorySchema = defineType({
	name: 'tagCategory',
	title: 'Tag Category',
	type: 'document',
	// @ts-ignore
	icon: ContainerIcon,
	fields: [
		{
			name: 'title',
			description: 'Begrens antall kategorier for å unngå tagg-jungel.',
			title: 'Tittel',
			type: 'string',
		},
	],
	preview: {
		select: {
			title: 'title.[0].value',
		},
		prepare(selection) {
			const { title } = selection;
			return {
				title: title ? title : 'Untitled',
			};
		},
	},
});