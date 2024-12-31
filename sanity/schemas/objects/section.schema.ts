import { defineField } from 'sanity';
import { LI } from '@/atoms/icon';
import { PanelsTopLeft } from 'lucide-react';
import { blocks } from './blocks.schema';

const sectionColors = [
	{ title: 'Hvit', value: 'white' },
];

const getColorTitle = (value: string) => {
	const option = sectionColors.find((opt) => opt.value === value);
	return option?.title || value;
};

export const sectionSchema = defineField({
	name: 'section',
	type: 'object',
	title: 'Seksjon',
	icon: LI(PanelsTopLeft, { width: 16, height: 16 }),
	fields: [
		{
			name: 'title',
			type: 'string',
			title: 'Tittel',
			description: 'Brukes bare til å identifisere seksjonen i Sanity',
			initialValue: 'Seksjon',
		},
		{
			name: 'color',
			type: 'string',
			title: 'Farge',
			description: 'Bakgrunnsfarge for seksjonen',
			options: {
				list: sectionColors,
			},
			initialValue: 'white',
			validation: (Rule) => Rule.required(),
		},
		blocks({}),
	],
	preview: {
		select: {
			title: 'title',
			color: 'color',
		},
		prepare({ title, color }) {
			const colorTitle = getColorTitle(color);

			return {
				title: title,
				subtitle: `Seksjon | ${colorTitle}`,
			};
		},
	},
});