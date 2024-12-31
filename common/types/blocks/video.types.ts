import { LynglandskapImage } from '../root.types';

export type IVideo = {
	_type: 'video';
	embed: string;
	service: string;
	thumbnail?: LynglandskapImage;
	description: string;
	title: string;
};