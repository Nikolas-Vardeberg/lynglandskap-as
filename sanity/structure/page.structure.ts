import { BookOpen, Home } from 'lucide-react';
import type { Structure } from './types';

export const pagesStructure: Structure = (S, C) =>
	S.listItem()
		.title('Sider')
		.icon(BookOpen)
		.child(
			S.list()
				.title('Sider')
				.items([
					S.listItem()
						.title('Hjemmeside')
						.icon(Home)
						.schemaType('homePage')
						.child(
							S.editor()
								.title('Hjemmeside')
								.schemaType('homePage')
								.documentId("homePage"),
						),
				]),
		);