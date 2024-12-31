import { BookOpen, DoorOpen, Home, MegaphoneIcon } from 'lucide-react';
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
								.documentId('homePage'),
						),
					S.listItem()
						.title('Transportsider')
						.icon(DoorOpen)
						.schemaType('transportPage')
						.child(
							S.documentTypeList('transportPage')
								.title('Transportsider')
								.filter(`_type == "transportPage"`)
						),
					S.listItem()
						.title('Generelle undersider')
						.icon(BookOpen)
						.schemaType('infoPage')
						.child(
							S.documentTypeList('infoPage')
								.title('Undersider')
								.filter(`_type == "infoPage"`)
						),
				]),
		);