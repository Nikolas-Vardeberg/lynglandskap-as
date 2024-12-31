import type { IVideo } from './video.types';
import type { InmetaImage } from '../root.types';
import type { Dispatch } from 'react';

export type IImageGallery = {
	_type: 'imageGallery';
	coverMethod: 'cover' | 'contain';
	images: (InmetaImage | IVideo)[];
};

export type GalleryImageStripNavProps = {
	data: IImageGallery;
	activeImage: number;
	getImage: (index: number) => InmetaImage | null;
	dispatch: Dispatch<{ type: 'next' } | { type: 'prev' } | { type: 'set'; payload: number }>;
};

export type GalleryImageStripProps = {
	from: number;
	to: number;
	images: (InmetaImage | IVideo)[];
	activeImage: number;
	getImage: (index: number) => InmetaImage | null;
	dispatch: Dispatch<{ type: 'next' } | { type: 'prev' } | { type: 'set'; payload: number }>;
};