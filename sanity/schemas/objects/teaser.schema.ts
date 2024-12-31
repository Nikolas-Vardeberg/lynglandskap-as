import { toPlainText } from '@portabletext/react';
import { defineField } from 'sanity';
import { image } from './image.schema';

export const teaserGroup = [
	defineField({
		name: 'teaserTitle',
		type: 'string',
		title: 'Teaser-tittel',
		description: 'Tittel brukt i transportinnganger. Bruker hodetittel hvis ikke satt',
		group: 'teaser',
		validation: (Rule) => Rule.max(60).warning('Tittelen er for lang'),
	}),
	defineField({
		name: 'teaserText',
		type: 'simpleRichText',
		title: 'Teaser-tekst',
		description: 'Tekst brukt i transportinnganger. Bruker ingress hvis ikke satt',
		group: 'teaser',
		validation: (R) =>
			R.custom((value) => {
				if (!value) return true;
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				const text = toPlainText(value as any[])?.trim();

				if (text?.length > 300) {
					return `Teksten er for lang (${text.length}/300 tegn)`;
				}
				return true;
			}).warning(),
	}),
	defineField({
		name: 'teaserLabel',
		type: 'string',
		title: 'Teaser-label',
		description: 'Label brukt i transportinnganger',
		group: 'teaser',
	}),
	image({
		group: 'teaser',
		name: 'teaserImage',
		title: 'Teaser-bilde',
		description: 'Bilde brukt i transportinnganger og SEO (overskriver hovedbilde)',
	}),
];