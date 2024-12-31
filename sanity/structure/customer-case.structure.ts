import { Archive, LibraryBig, Microscope } from 'lucide-react';
import type { Structure } from './types';

export const customerCasesStructure: Structure = (S, C) =>
	S.listItem()
		.title('Kundereferanser')
		.icon(LibraryBig)
		.schemaType('customerCase')
		.child(
			S.list()
				.title('Kundereferanser')
				.items([
					S.listItem()
						.title('Bransjer')
						.icon(Archive)
						.schemaType('industry')
						.child(S.documentTypeList('industry').title('Bransjer')),
					S.divider(),
					S.listItem()
						.title('Alle Kundereferanser')
						.icon(LibraryBig)
						.schemaType('customerCase')
						.child(
							S.documentTypeList('customerCase')
								.title('Kundereferanser')
								.filter(`_type == "customerCase"`)
						),
				]),
		);