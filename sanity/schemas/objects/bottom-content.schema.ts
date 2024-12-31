import { defineType } from 'sanity';
import { blocks } from './blocks.schema';

export const bottomContentFields = defineType({
	name: 'bottomContent',
	title: 'Relatert innhold',
	type: 'document',
	fields: [
		{
			name: 'title',
			type: 'string',
			title: 'Title',
		},
		{
			name: 'showRealatedPages',
			type: 'boolean',
			initialValue: true,
			title: 'Vis relaterte sider',
		},
		blocks({}),
	],
});