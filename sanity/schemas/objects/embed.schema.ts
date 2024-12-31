import { LI } from '@/atoms/icon';
import { Link2 } from 'lucide-react';
import { defineField } from 'sanity';

export const embedBlock = defineField({
	name: 'embedBlock',
	title: 'Embed Block',
	type: 'object',
	// @ts-ignore
	icon: LI(Link2, { width: 16, height: 16 }),
	fields: [
		{
			name: 'embed',
			title: 'Embed',
			type: 'text',
		},
	],
	preview: {
		select: {
			embed: 'embed',
		},
		prepare: ({ embed }) => ({
			title: 'Embed Block',
			subtitle: embed,
		}),
	},
});