import { Images } from 'lucide-react';
import { defineField } from 'sanity';
import { image } from './image.schema';
import { LI } from '@/atoms/icon';

export const imageGallery = defineField({
	name: 'imageGallery',
	title: 'Bildegalleri',
	type: 'object',
	// @ts-ignore
	icon: LI(Images, { width: 16, height: 16 }),
	fields: [
		{
			name: 'images',
			title: 'Images',
			type: 'array',
			of: [
				image({}),
				{
					type: 'object',
					name: 'video',
					fields: [
						{
							type: 'reference',
							to: [{ type: 'video' }],
							name: 'video',
						},
					],
				},
			],
			validation: (Rule) => Rule.required().min(3).max(10),
			options: {
				layout: 'grid',
			},
		},
		{
			name: 'coverMethod',
			title: 'Visningsmetode',
			type: 'string',
			initialValue: 'cover',
			validation: (Rule) => Rule.required(),
			options: {
				list: [
					{ title: 'Full (cover)', value: 'cover' },
					{ title: 'Tilpass (contain)', value: 'contain' },
				],
				layout: 'radio',
			},
		},
	],
	preview: {
		select: {
			images: 'images',
		},
		prepare(selection) {
			const { images } = selection;
			return {
				title: 'Bildegalleri',
				subtitle: `${images.length} bilder`,
			};
		},
	},
});