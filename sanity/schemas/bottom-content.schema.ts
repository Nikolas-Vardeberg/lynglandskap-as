import { defineType } from 'sanity';
import { bottomContentFields } from './objects/bottom-content.schema';

export const bottomContents = defineType({
	name: 'bottomContent',
	title: 'Relatert innhold',
	type: 'document',
	groups: [
		{ title: 'General', name: 'general' },
		{ title: 'Artikler', name: 'article' },
		{ title: 'Kundereferanser', name: 'customerCase' },
		{ title: 'Transportsider', name: 'transportPage' },
		{ title: 'Undersider', name: 'infoPage' },
		{ title: 'hjemmeside', name: 'homePage' },
		{ title: 'Search', name: 'search' },
		{ title: '404', name: 'notFound' },
	],

	fields: [
		{
			name: 'article',
			type: 'object',
			title: 'Artikkel',
			group: 'article',
			description:
				'Generelle innstillinger for artikkelsider. Innholdet som legges til her vises som standard på alle artikler, med mindre dette overskrives i spesifikke artikler.',
			fields: [...bottomContentFields.fields],
		},
		{
			name: 'customerCase',
			type: 'object',
			title: 'kundereferanser',
			group: 'customerCase',
			description:
				'Generelle innstillinger for kundereferanser. Innholdet som legges til her vises som standard på alle kundereferanser, med mindre dette overskrives i spesifikke kundereferanser. ',
			fields: [...bottomContentFields.fields],
		},
		{
			name: 'transportPage',
			type: 'object',
			title: 'Transportsider',
			group: 'transportPage',
			description:
				'Generelle innstillinger for transportsider. Innholdet som legges til her vises som standard på alle transportsider, med mindre dette overskrives i spesifikke transportsider. ',
			fields: [...bottomContentFields.fields],
		},
		{
			name: 'infoPage',
			type: 'object',
			title: 'Under sider',
			group: 'infoPage',
			description:
				'Generelle innstillinger for undersider. Innholdet som legges til her vises som standard på alle undersider, med mindre dette overskrives i spesifikke undersider. ',
			fields: [...bottomContentFields.fields],
		},
		{
			name: 'homePage',
			type: 'object',
			title: 'Hjemmeside',
			group: 'homePage',
			description:
				'Generelle innstillinger for hjemmesiden. Innholdet som legges til her vises som standard på hjemmesiden, med mindre dette overskrives i spesifikke sider. ',
			fields: [...bottomContentFields.fields],
		},
		{
			name: 'search',
			type: 'object',
			title: 'Søk',
			group: 'search',
			fields: [...bottomContentFields.fields],
		},
		{
			name: 'notFound',
			type: 'object',
			title: '404',
			group: 'notFound',
			fields: [...bottomContentFields.fields],
		},
	],
	preview: {
		select: {
			title: 'title',
		},
	},
});