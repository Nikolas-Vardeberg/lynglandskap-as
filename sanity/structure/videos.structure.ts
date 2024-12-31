import { Video } from 'lucide-react';
import type { Structure } from './types';

export const videoesStructure: Structure = (S, C) =>
	S.listItem()
		.title('Videoer')
		.icon(Video)
		.child(
			S.documentTypeList('video').title('Videoer').filter(`_type == "video"`),
		);