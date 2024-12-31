import { FileVideo } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { LI } from '@/atoms/icon';

export const video = defineType({
	type: 'document',
	name: 'video',
	title: 'Video',
	// @ts-ignore
	icon: LI(FileVideo, { width: 16, height: 16 }),
	fields: [
		{
			name: 'title',
			type: 'string',
			title: 'Tittel', // Translated title
		},
		{
			name: 'description',
			type: 'text',
			title: 'Beskrivelse/videotekst', // Translated title
			description: 'Beskrivelse av videoen', // Translated description
		},
		{
			name: 'service',
			type: 'string',
			title: 'Tjeneste', // Translated title
			description: 'Tjenesten som hoster videoen', // Translated description
			options: {
				list: [
					{ title: 'YouTube', value: 'youtube' },
					{ title: 'Vimeo', value: 'vimeo' },
				],
				layout: 'radio',
				direction: 'horizontal',
			},
		},
		{
			name: 'embed',
			type: 'string',
			title: 'Embed kode', // Translated title
			description: 'Embed kode for videoen', // Translated description
			// hidden if service is not set
			hidden: ({ document }) => !document?.service,
		},
	],
	preview: {
		select: {
			title: 'title',
		},
	},
});

export const videoReference = (props: {
	group?: string;
	title?: string;
	description?: string;
	name?: string;
}) =>
	defineField({
		name: 'video',
		title: 'Video',
		type: 'reference',
		to: [{ type: 'video' }],
		...props,
	});

export const videoReferenceObject = (props: {
	group?: string;
	title?: string;
	description?: string;
	name?: string;
}) =>
	defineField({
		type: 'object',
		name: 'video',
		fields: [videoReference(props)],
		...props,
	});