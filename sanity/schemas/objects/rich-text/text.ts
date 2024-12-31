import { TextCursorIcon, TextIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { getDefaultBlockSetup } from './defaults';
import { externalLink } from './external-link';
import { internalLink } from './internal-link';
import { LI } from '@/atoms/icon';

/**
 * Rich text block
 * @description
 * This is the main rich text block that is used in the CMS.
 * It is used to create rich text content in the CMS.
 */
export const richText = defineType({
	name: 'richText',
	type: 'array',
	// @ts-ignore
	icon: TextIcon,
	of: [
		...getDefaultBlockSetup({
			headingLevels: ['h2', 'h3', 'h4', 'h5'],
			lists: true,
			annotations: [internalLink, externalLink],
		}), // Styling
	],
});

/**
 * Entry rich text block
 * @description
 * This is a simpler rich text block that is used in the entry field of pages.
 */
export const entryRichText = defineType({
	name: 'entryRichText',
	type: 'array',
	// @ts-ignore
	icon: TextIcon,
	of: [
		...getDefaultBlockSetup({
			annotations: [internalLink, externalLink],
		}),
	],
});

/**
 * Fact block rich text
 * @description
 * This is a rich text block that is used in the fact block of pages.
 */
export const factBlockRichText = defineType({
	name: 'factBlockRichText',
	type: 'array',
	// @ts-ignore
	icon: TextIcon,
	of: [
		...getDefaultBlockSetup({
			annotations: [internalLink, externalLink],
			lists: true,
		}),
	],
});

/**
 * Simple rich text block
 * @description
 * This is a simpler rich text block that is used in the entry field of pages.
 */
export const simpleRichText = defineType({
	name: 'simpleRichText',
	type: 'array',
	// @ts-ignore
	icon: TextIcon,
	of: [...getDefaultBlockSetup({})],
});

export const simplerRichText = defineType({
	name: 'simplerRichText',
	type: 'array',
	// @ts-ignore
	icon: TextIcon,
	of: [
		...getDefaultBlockSetup({
			headingLevels: ['h2', 'h3', 'h4', 'h5'],
			lists: true,
			annotations: [internalLink, externalLink],
		}),
	],
});

export const simplerTextObject = defineField({
	type: 'object',
	title: 'Riktekst',
	name: 'simplerRichText',
	icon: LI(TextCursorIcon, { width: 16, height: 16 }),
	fields: [
		{
			name: 'text',
			type: 'simplerRichText',
			title: 'Text',
		},
	],
	preview: {
		prepare: () => ({
			title: 'Riktekst',
		}),
	},
});