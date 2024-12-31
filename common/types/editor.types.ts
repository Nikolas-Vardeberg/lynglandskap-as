import type { LynglandskapImage } from './root.types';

export type Editor = {
	_type: 'editor';
	name: string;
	title: string;
	email: string;
	phone: string;
	company: string;
	location: string;
	department: string;
	linkedin: string;
	bookMeetingLink?: string;
	image: LynglandskapImage;
};