import type { Structure } from '@/sanity/structure/types';
import { TagsIcon } from 'lucide-react';

export const tagsStructure: Structure = (S, C) =>
	S.listItem()
		.title('Tags')
		.icon(TagsIcon)
		.schemaType('tag')
		.child(
			S.list()
				.title('Tags')
				.items([
					S.listItem()
						.title('Alle tagger')
						.child(S.documentTypeList('tag').title('All Tags').filter('_type == "tag"')),
					S.listItem()
						.title('Tagger uten kategori')
						.child(
							S.documentTypeList('tag').title('All Tags').filter('_type == "tag" && !defined(category)'),
						),
					S.divider(),
					S.listItem()
						.title('Tagger etter kategori')
						.child(
							S.documentTypeList('tagCategory')
								.title('Categories')
								.child((categoryId) =>
									S.documentTypeList('tag')
										.title('Tags')
										.filter('_type == "tag" && category._ref == $categoryId')
										.params({ categoryId })
										.initialValueTemplates([
											S.initialValueTemplateItem('tag-with-category', {
												type: 'tag',
											}).parameters({
												categoryId,
											}),
										]),
								),
						),
					S.listItem().title('Kategorier').child(S.documentTypeList('tagCategory').title('Kategorier')),
				]),
		);