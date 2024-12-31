import { defineField, defineType } from 'sanity';
import { teaserGroup } from '../objects/teaser.schema';
import { blockArea, blocks } from '../objects/blocks.schema';
import { seo } from '../objects/seo.schema';
import { tags } from '../objects/tags.schema';
import { slug } from '../objects/slug.schema';

export const transportPage = defineType({
	type: 'document',
	name: 'transportPage',
	title: 'Transport Page',
	groups: [
		{
			name: 'general',
			title: 'Generelt',
			default: true,
		},
		{
			name: 'teaser',
			title: 'Teaser',
		},
		{
			name: 'seo',
			title: 'SEO',
		},
		{
			name: 'options',
			title: 'Options',
		},
		{
			name: 'bottomContent',
			title: 'Relatert innhold',
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
		{
			name: 'entry',
			type: 'entryRichText',
			title: 'Entry',
			group: 'general',
		},
        tags({ group: "general" }),
		blocks({
			group: 'general',
		}),
		blockArea({
			group: 'general',
		}),
		seo({ group: 'seo' }),
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