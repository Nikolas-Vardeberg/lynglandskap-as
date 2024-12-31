import { InmetaImage } from '../root.types';

export type IVideo = {
	_type: 'video';
	embed: string;
	service: string;
	thumbnail?: InmetaImage;
	description: string;
	title: string;
};