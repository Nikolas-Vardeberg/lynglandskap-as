import { defineField } from 'sanity';

export const seo = ({ group }: { group?: string }) =>
	defineField({
		name: 'seo',
		title: 'SEO',
		...(group && { group }),
		type: 'object',
		description: 'Informasjon som vises i søkemotorer og ved deling i sosiale medier.',
		fields: [
			{
				name: 'title',
				type: 'string',
				title: 'Meta tittel',
				description: 'Hvis tom, brukes tittel på siden',
			},
			{
				name: 'description',
				type: 'text',
				title: 'Meta beskrivelse',
				description: 'Hvis tom, brukes ingressen på siden',
				// give warning if under 80 characters
				validation: (Rule) => Rule.min(80).warning('Beskrivelsen bør være minst 80 tegn'),
				rows: 3,
			},
			{
				name: 'robots',
				title: 'Behandling av søkemotorer',
				type: 'string',
				description: 'Hvordan skal søkemotorer behandle denne siden?',
				initialValue: 'index,follow',
				options: {
					list: [
						{ title: 'Vis i google', value: 'index,follow' },
						{
							title: 'Ikke vis i google',
							value: 'noindex,nofollow',
						},
					],
				},
			},
		],
	});