import { LI } from '@/atoms/icon';
import { toPlainText } from '@portabletext/react';
import { DoorOpen } from 'lucide-react';
import { defineField } from 'sanity';
import { image } from './image.schema';
import { pages } from '@/sanity/constants';

// "lv" | "lh" | "sv" | "sh" | "ss"
export const transportBlockVariantOptions = [
	{ title: 'Vanlig', value: 'default' },
];

export const transportBlocks = defineField({
	name: 'transportBlocks',
	title: 'Transportblokker',
	type: 'object',
	// @ts-ignore
	icon: LI(DoorOpen, { width: 16, height: 16 }),
	fields: [
		{
			name: 'title',
			title: 'Tittel',
			type: 'string',
		},
		{
			name: 'description',
			title: 'Ingress',
			type: 'simpleRichText',
		},
		{
			name: 'hideImage',
			title: 'Skjul bilde',
			type: 'boolean',
			initialValue: false,
			hidden: ({ parent }) => !parent?.pages || parent?.pages?.length === 1,
		},
		{
			name: 'pages',
			title: 'Sider',
			type: 'array',
			of: [
				{
					title: 'Vanlig sidereferanse',
					type: 'reference',
					to: pages,
					validation: (Rule) => Rule.required(),
				},
				{
					type: 'object',
					title: 'Overskrevet sidereferanse',
					fields: [
						{
							name: 'title',
							type: 'string',
							title: 'Tittel',
							description: 'Tittel brukt i transportinnganger. Bruker fra referansen hvis ikke satt',
						},
						image({
							description: 'Bilde brukt i transportinnganger. Bruker fra referansen hvis ikke satt',
						}),
						defineField({
							name: 'teaserText',
							type: 'simpleRichText',
							title: 'Tekst',
							description: 'Tekst brukt i transportinnganger. Bruker fra referansen hvis ikke satt',
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
						{
							title: 'Referanse',
							type: 'reference',
							name: 'page',
							to: pages,
							validation: (Rule) => Rule.required(),
						},
					],

					preview: {
						select: {
							title: 'title',
							backupTitle: 'page.teaserTitle',
							backupBackupTitle: 'page.title',
							media: 'image',
							backupMedia: 'page.teaserImage',
							backupBackupMedia: 'page.mainImage',
						},
						prepare(selection) {
							const { title, backupTitle, backupBackupTitle, media, backupMedia, backupBackupMedia } =
								selection;
							return {
								title: title || backupTitle || backupBackupTitle,
								subtitle: title,
								media: media || backupMedia || backupBackupMedia,
							};
						},
					},
				},
				{
					type: 'object',
					title: 'Eksternal link',
					name: 'externalLink',
					fields: [
						{
							name: 'title',
							type: 'string',
							title: 'Tittel',
						},
						{
							name: 'url',
							type: 'url',
							title: 'URL',
						},
						image({}),

						defineField({
							name: 'teaserText',
							type: 'simpleRichText',
							title: 'Tekst',
							description: 'Tekst brukt i transportinnganger. Bruker ingress hvis ikke satt',
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
					],
				},
			],
		},
		{
			name: 'options',
			title: 'Innstillinger',
			type: 'object',
			fields: [
				{
					name: 'hideLabel',
					title: 'Skjul label',
					type: 'boolean',
					initialValue: false,
				},
				{
					name: 'hideTags',
					title: 'Skjul tags',
					type: 'boolean',
					initialValue: false,
				},
			],
			options: {
				collapsible: true,
				collapsed: true,
			},
		},
		{
			name: 'variant',
			type: 'string',
			title: 'Type',
			options: {
				list: transportBlockVariantOptions,
			},
			initialValue: 'default',
			validation: (Rule) => Rule.required(),
			// @ts-ignore
			deprecated: true,
			description: 'Utfaset, Type settes automatisk basert på antall sider',
			readOnly: true,
			hidden: true,
		},
	],
	preview: {
		select: {
			title: 'title',
			pages: 'pages',
		},
		prepare(selection) {
			const { title, pages } = selection;

			const resolvedTitle = title || 'Transportblokk uten tittel';
			const pageCountNote = pages.length ? ` (${pages.length} side${pages.length > 1 ? 'r' : ''})` : '';

			return {
				title: `${resolvedTitle}${pageCountNote}`,
				subtitle: 'Transportblokk',
			};
		},
	},
});