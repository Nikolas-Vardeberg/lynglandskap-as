import { defineType } from 'sanity';
import { blockArea, blocks } from '../objects/blocks.schema';
import { image } from '../objects/image.schema';
import { seo } from '../objects/seo.schema';
import { teaserGroup } from '../objects/teaser.schema';
import { tags } from '../objects/tags.schema';
import { slug } from '../objects/slug.schema';

export const infoPage = defineType({
	type: 'document',
	name: 'infoPage',
	title: 'Information Page',
	groups: [
		{
			title: 'General',
			name: 'general',
			default: true,
		},
		{
			name: 'teaser',
			title: 'Teaser',
		},
		{
			title: 'SEO',
			name: 'seo',
		},
		{
			title: 'Relatert innhold',
			name: 'bottomContent',
		},
	],
	fields: [
		{
			name: 'title',
			type: 'string',
			title: 'Title',
			group: 'general',
		},
		slug(undefined, {
			group: "general",
		}),
		tags({ group: "general" }),
		image({
			name: 'mainImage',
			group: 'general',
			description: 'The main image of the article',
		}),
		{
			name: 'entry',
			type: 'entryRichText',
			title: 'Entry',
			group: 'general',
		},
		blocks({
			group: 'general',
		}),
		blockArea({
			group: 'general',
		}),
		seo({
			group: 'seo',
		}),
		{
			name: 'pageType',
			type: 'string',
			title: 'Sidetype',
			options: {
				list: [
					{ title: 'Udefinert', value: 'info' },
					{ title: 'Tjeneste- og partnere side', value: 'service' },
				],
			},
			initialValue: 'info',
		},
		...teaserGroup,
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'slug.current',
			mainImage: 'mainImage',
			teaser: 'teaserImage',
		},
		prepare({ title, subtitle, mainImage, teaser }) {
			return {
				title,
				subtitle: subtitle,
				media: mainImage || teaser,
			};
		},
	},
});