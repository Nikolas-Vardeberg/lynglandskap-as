import { pages } from '@/sanity/constants';
import { LI } from '@/atoms/icon';
import { UsersRound } from 'lucide-react';
import { defineField } from 'sanity';

export const contactsBlock = defineField({
	name: 'contactsBlock',
	title: 'Kontakter blokk',
	type: 'object',
	// @ts-ignore
	icon: LI(UsersRound, { width: 16, height: 16 }),
	fields: [
		{
			name: 'title',
			title: 'Tittel',
			type: 'string',
		},
		{
			name: 'description',
			title: 'Beskrivelse',
			type: 'string',
		},
		{
			name: 'contacts',
			title: 'Kontakter',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'editor' }],
					validation: (Rule) => Rule.required(),
				},
			],
		},
		{
			name: 'moreLink',
			title: 'Kontaktpersoner-lenke',
			type: 'reference',
			description: 'Lenke til side hvor brukeren kan se flere kontaktpersoner',
			to: pages,
		},
		{
			name: 'moreLinkTitle',
			title: 'Tittel kontaktpersoner-lenke',
			type: 'string',
			description: 'Tittel på lenken til siden hvor brukeren kan se flere kontaktpersoner',
		},
	],
	preview: {
		select: {
			title: 'title',
		},
		prepare(selection) {
			return {
				title: selection.title,
				subtitle: 'Kontakter-blokk',
			};
		},
	},
});