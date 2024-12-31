import { FileSearch, PanelTopDashed, Settings } from 'lucide-react';
import type { Structure } from './types';

export const settingsStructure: Structure = (S, C) =>
	S.listItem()
		.title('Generelt')
		.icon(Settings)
		.child(
			S.list()
				.title('Innstillinger')
				.items([
					S.listItem()
						.title('Innstillinger')
						.icon(Settings)
						.child(
							S.editor()
								.title('Innstillinger')
								.schemaType('settings')
								.documentId('settings'),
						),
					S.listItem()
						.title('Meny')
						.icon(PanelTopDashed)
						.child(S.editor().title('Meny').schemaType('menu').documentId('menu')),

					S.listItem()
						.title('SEO')
						.icon(FileSearch)
						.child(S.editor().title('SEO').schemaType('seo').documentId('seo')),
				]),
		);