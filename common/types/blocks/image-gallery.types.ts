import type { IVideo } from './video.types';
import type { LynglandskapImage } from '../root.types';
import type { Dispatch } from 'react';

export type IImageGallery = {
	_type: 'imageGallery';
	coverMethod: 'cover' | 'contain';
	images: (LynglandskapImage | IVideo)[];
};

export type GalleryImageStripNavProps = {
	data: IImageGallery;
	activeImage: number;
	getImage: (index: number) => LynglandskapImage | null;
	dispatch: Dispatch<{ type: 'next' } | { type: 'prev' } | { type: 'set'; payload: number }>;
};

export type GalleryImageStripProps = {
	from: number;
	to: number;
	images: (LynglandskapImage | IVideo)[];
	activeImage: number;
	getImage: (index: number) => LynglandskapImage | null;
	dispatch: Dispatch<{ type: 'next' } | { type: 'prev' } | { type: 'set'; payload: number }>;
};