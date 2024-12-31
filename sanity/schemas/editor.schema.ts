import { defineType } from 'sanity';
import { image } from './objects/image.schema';

export const editor = defineType({
	type: 'document',
	name: 'editor',
	title: 'Person',
	fields: [
		{
			name: 'name',
			title: 'Fullt navn',
			type: 'string',
		},
		{
			name: 'title',
			title: 'Stilling/rolle',
			type: 'internationalizedArrayString',
		},
		{
			name: 'company',
			title: 'Selskap',
			type: 'string',
		},
		{
			name: 'department',
			title: 'Avdeling',
			type: 'internationalizedArrayString',
		},
		{
			name: "bookMeetingLink",
			title: "Book ett møte lenke",
			type: 'url',
			description:
				'Dette er en lenke fra office 365s book møte funksjon. Lim inn den lenken her.',
		},
		{
			name: 'mail',
			title: 'Epostadresse',
			type: 'string',
			validation: (R) => R.email(),
		},
		{
			name: 'phone',
			type: 'string',
		},
		{
			name: 'linkedin',
			title: 'Linkedin',
			type: 'url',
		},
		image({
			name: 'image',
			title: 'Bilde',
		}),
		{
			name: 'isEditor',
			title: 'Er redaktør',
			type: 'boolean',
			initialValue: false,
		},
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'title.[0].value',
			media: 'image',
		},
		prepare(selection) {
			return {
				title: selection.title,
				subtitle: selection.subtitle,
				media: selection.media,
			};
		},
	},
});