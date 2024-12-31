import type { LynglandskapImage, Page } from './root.types';

export type IPartner = {
	_id: string;
	_type: 'partner';
	_createdAt: string;
	name: string;
	logo: LynglandskapImage & {
		url: string;
	};
	page: {
		nb?: Page;
		sv?: Page;
	};
	teaserText?: string;
};