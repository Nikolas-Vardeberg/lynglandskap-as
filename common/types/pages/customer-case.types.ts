import type { BasePage, LynglandskapImage, SanityContentTypeBase, SanityRichtTextType } from '../root.types';

export type CustomerCase = BasePage & {
	mainImage?: LynglandskapImage;
	content: SanityRichtTextType;
} & SanityContentTypeBase<'customerCase'>;

export type Industry = {
	_id: string;
	title: string;
	slug: string;
} & SanityContentTypeBase<'industry'>;