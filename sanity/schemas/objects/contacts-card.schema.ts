import { defineField } from 'sanity';

export const ContactCardBlock = defineField({
	name: 'contactCardBlock',
	title: 'Person Kort Info Block',
	type: 'object',
	fields: [
		{
			name: 'editor',
			title: 'Redaktør',
			type: 'reference',
			to: [{ type: 'editor' }],
		},
	],
	preview: {
		select: {
			editor: 'editor.name',
		},
		prepare(selection) {
			const { editor } = selection;
			return {
				title: 'Person Kort Info Block',
				subtitle: editor,
			};
		},
	},
});