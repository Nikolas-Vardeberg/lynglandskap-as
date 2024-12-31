import { ListEnd } from 'lucide-react';
import type { Structure } from './types';

export const blockAreaDefaultsStructure: Structure = (S, C) =>
	S.listItem()
		.title('Blokkområde')
		.icon(ListEnd)
		.child(
			S.editor()
				.title('Blokkområde')
				.schemaType('blockAreaDefaults')
				.documentId('blockAreaDefaults'),
		);