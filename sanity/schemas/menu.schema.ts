import { pages } from '@/sanity/constants';
import { defineField, defineType } from 'sanity';

/**
 * Menu content
 * Is an array of either (title + ref) or (title + items(title + ref + children(title + ref)))
 */
// #region menu-content
const menuContent = defineField({
	name: 'menuContent',
	type: 'array',
	title: 'Meny innhold',
	of: [
		{
			type: 'object',
			name: 'simpleMenuReference',
			title: 'Enkel sidereferanse',
			fields: [
				{
					name: 'title',
					type: 'string',
					title: 'Tittel',
				},
				{
					name: 'reference',
					type: 'reference',
					title: 'Referanse',
					validation: (Rule) => Rule.required(),
					to: pages,
				},
			],
		},
		{
			type: 'object',
			name: 'menuWithChildren',
			title: 'Meny med undermeny',
			fields: [
				{
					name: 'title',
					type: 'string',
					title: 'Tittel',
				},
				{
					name: 'children',
					type: 'array',
					title: 'Megameny innhold',
					of: [
						{
							name: 'megaMenuMainReference',
							type: 'object',
							title: 'Megameny hovedreferanse',
							fields: [
								{
									name: 'title',
									type: 'string',
									title: 'Tittel',
									description: 'Brukes bare om det er flere elementer i megamenyen',
								},
								{
									name: 'children',
									type: 'array',
									title: 'Megameny undermeny',
									of: [
										{
											name: 'megaMenuSubReference',
											type: 'object',
											title: 'Megameny underreferanse',
											fields: [
												{
													title: 'Tittel',
													name: 'title',
													type: 'string',
												},
												{
													name: 'reference',
													type: 'reference',
													title: 'Referanse',
													validation: (Rule) => Rule.required(),
													to: pages,
												},
											],
										},
									],
								},
								{
									name: 'viewAllText',
									type: 'string',
									title: 'Lenketekst for Se mer-referanse',
									description:
										'Tekst som vises på "Se alle *"-referansen, f.eks. "Se alle våre tjenester". Hvis feltet er tomt, vises ikke lenken i menyen',
								},
								{
									name: 'reference',
									type: 'reference',
									title: 'Se mer-referanse',
									to: pages,
								},
							],
						},
					],
					validation: (Rule) => Rule.max(4).error('Du kan ikke legge til flere enn fire elementer'),
				},
			],
		},
	],
	validation: (R) =>
		R.custom((value) => {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			const menuItems = (value as any[]).filter((item) => item._type === 'menuWithChildren');
			const megaMenus = menuItems.filter((item) => item.children.length > 1);

			if (menuItems.length > 3) return 'Du kan ikke ha flere enn tre elementer i menyen';

			if (megaMenus.length > 1) return 'Du kan ikke ha flere enn én megameny med undermenyer';

			return true;
		}),
});
// #endregion

export const menu = defineType({
	type: 'document',
	name: 'menu',
	title: 'Menu',
	fields: [
		{
			name: 'contactReference',
			type: 'reference',
			title: 'Kontakt oss refereanse',
			to: pages,
		},
		menuContent,
	],
	preview: {
		prepare: () => ({
			title: 'Menu',
		}),
	},
});