import { blockArea } from '@/sanity/schemas/objects/blocks.schema';
import { defineType } from 'sanity';
import { image } from '../objects/image.schema';
import { seo } from '../objects/seo.schema';
import { teaserGroup } from '../objects/teaser.schema';
import { tags } from '../objects/tags.schema';

export const article = defineType({
	type: 'document',
	name: 'article',
	title: 'Article',
	groups: [
		{
			name: 'general',
			title: 'General',
			default: true,
		},
		{
			name: 'teaser',
			title: 'Teaser',
		},
		{
			name: 'byline',
			title: 'Byline',
		},
		{
			name: 'seo',
			title: 'SEO & Routing',
		},
	],
	fields: [
		{
			name: 'title',
			type: 'string',
			title: 'Tittel',
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
        tags({ group: 'general' }),
		image({
			name: 'mainImage',
			group: 'general',
			title: 'Hovedbilde',
			description: 'Hovedbilde for artikkelen',
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
		...teaserGroup,
	],
	orderings: [
		{
			title: 'Publiseringsdato (nyeste først)',
			name: 'publishDateDesc',
			by: [{ field: 'publishedAt', direction: 'desc' }],
		},
		{
			title: 'Publiseringsdato (eldste først)',
			name: 'publishDateAsc',
			by: [{ field: 'publishedAt', direction: 'asc' }],
		},
		{
			title: 'Tittel (A-Å)',
			name: 'titleAsc',
			by: [{ field: 'title', direction: 'asc' }],
		},
		{
			title: 'Tittel (Å-A)',
			name: 'titleDesc',
			by: [{ field: 'title', direction: 'desc' }],
		},
	],
	preview: {
		select: {
			title: 'title',
			publishedAt: 'publishedAt',
			mainImage: 'mainImage',
			teaser: 'teaserImage',
		},
		prepare({ title, publishedAt, mainImage, teaser }) {
			return {
				title,
				subtitle: new Date(publishedAt).toLocaleDateString(),
				media: mainImage || teaser,
			};
		},
	},
});