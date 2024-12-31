import type { Structure } from './types';
import { Newspaper } from 'lucide-react';

export const articlesStructure: Structure = (S, C) =>
	S.listItem()
		.title('Artikler')
		.icon(Newspaper)
		.schemaType('article')
		.child(
			S.list()
				.title('Artikler')
				.id('articles')
				.items([
					S.listItem()
						.title('Alle artikler')
						.id('all')
						.schemaType('article')
						.child(
							S.documentTypeList('article')
								.title('Alle artikler')
								.filter(`_type == "article"`)
						),
				]),
		);