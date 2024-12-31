import { blockArea } from '@/sanity/schemas/objects/blocks.schema';
import { defineType } from 'sanity';
import { image } from '../objects/image.schema';
import { seo } from '../objects/seo.schema';
import { toPlainText } from '@portabletext/react';

export const customerCase = defineType({
	name: 'customerCase',
	title: 'Kundecase',
	type: 'document',
	groups: [
		{
			name: 'general',
			title: 'Generelt',
			default: true,
		},
		{
			name: 'byline',
			title: 'Byline',
		},
		{
			name: 'teaser',
			title: 'Teaser',
		},
		{
			name: 'seo',
			title: 'SEO',
		},
	],
	fields: [
		{
			name: 'title',
			type: 'string',
			title: 'Title',
			group: 'general',
		},
		{
			name: 'entry',
			type: 'entryRichText',
			title: 'Ingress',
			group: 'general',
		},
		{
			name: 'publishedAt',
			type: 'datetime',
			title: 'Publisert',
			group: 'general',
			description: 'Dato for publisering av artikkelen',
			initialValue: new Date().toISOString(),
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'teaserLabel',
			type: 'string',
			title: 'Kundenavn',
			description: 'Kundenavn brukt i transportinnganger',
			group: 'general',
		},
		image({
			name: 'mainImage',
			group: 'general',
			description: 'The main image of the article',
		}),
		{
			name: 'content',
			type: 'richText',
			title: 'Content',
			group: 'general',
		},
		blockArea({
			group: 'general',
		}),
		{
			name: 'editor',
			title: 'Redaktør',
			type: 'reference',
			to: [{ type: 'editor' }],
			group: 'byline',
		},
		seo({ group: 'seo' }),
		{
			name: 'industry',
			type: 'array',
			title: 'Bransje / Bransjer',
			group: 'general',
			of: [{ type: 'reference', to: [{ type: 'industry' }] }],
		},
		{
			name: 'teaserTitle',
			type: 'string',
			title: 'Teaser-tittel',
			description: 'Tittel brukt i transportinnganger. Bruker hodetittel hvis ikke satt',
			group: 'teaser',
			validation: (Rule) => Rule.max(60).warning('Tittelen er for lang'),
		},
		{
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
		},
		image({
			group: 'teaser',
			name: 'teaserImage',
			title: 'Teaser-bilde',
			description: 'Bilde brukt i transportinnganger og SEO (overskriver hovedbilde)',
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'publishedAt',
			mainImage: 'mainImage',
			teaser: 'teaserImage',
		},
		prepare({ title, subtitle, mainImage, teaser }) {
			return {
				title,
				subtitle: new Date(subtitle).toLocaleDateString(),
				media: mainImage || teaser,
			};
		},
	},
	orderings: [
		{
			title: 'Publiseringsdato, nyeste først',
			name: 'publishedAt',
			by: [{ field: 'publishedAt', direction: 'desc' }],
		},
		{
			title: 'Publiseringsdato, eldste først',
			name: 'publishedAt',
			by: [{ field: 'publishedAt', direction: 'asc' }],
		},
	],
});

export const industry = defineType({
	name: 'industry',
	title: 'Industry',
	type: 'document',
	fields: [
		{
			name: 'title',
			type: 'string',
			title: 'Title',
		},
		{
			name: 'slug',
			type: 'slug',
			title: 'Slug',
			description: 'The slug for the industry',
			validation: (Rule) => Rule.required(),
			options: {
				source: 'title',
			},
		},
	],
});