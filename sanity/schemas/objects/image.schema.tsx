import { LI } from '@/atoms/icon';
import { Image } from 'lucide-react';
import { defineField, type Rule } from 'sanity';

type Props = {
	name?: string;
	group?: string;
	description?: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	options?: any;
	title?: string;
	validation?: (Rule: Rule) => Rule;
	aspect?: boolean;
	includeWidthOptions?: boolean;
};

export const image = ({ options, aspect, includeWidthOptions, ...props }: Props) => {
	return defineField({
		type: 'image',
		title: 'Bilde',
		icon: LI(Image),
		options: {
			...options,
			hotspot: true,
		},
		fields: [
			{
				name: 'description',
				type: 'string',
				title: 'Bildetekst',
				description: 'En kort beskrivelse av bildet. Bruk bildetekst i media for gjenbruk.',
			},
			...(aspect
				? [
						{
							name: 'aspect',
							type: 'string',
							title: 'Bildeforholdet',
							options: {
								list: ['auto', '1:1', '16:9', '4:3'],
							},
							initialValue: '16:9',
						},
					]
				: []),
			...(includeWidthOptions
				? [
						{
							name: 'width',
							type: 'number',
							title: 'Bredden på bildet i innholder',
							options: {
								list: [
									{ title: 'Full bredde', value: 1 },
									{ title: 'Halv bredde', value: 0.5 },
									{ title: 'Kvart bredde', value: 0.25 },
								],
							},
							initialValue: 1,
						},
					]
				: []),
			{
				name: 'altTextOverride',
				type: 'string',
				title: 'Alternativ tekst',
				description: 'Beskriv bildet for noen som ikke kan se det.',
			},
		],
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		...(props as any),
		name: props.name || 'image',
		preview: {
			select: {
				title: 'asset.originalFilename',
				subtitle: 'asset.description',
				media: 'asset',
			},
		},
	});
};