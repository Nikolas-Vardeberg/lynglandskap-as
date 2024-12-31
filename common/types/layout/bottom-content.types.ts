import type { Block } from '../blocks/blocks.types';

export type BottomContent = {
	_type: 'bottomContent';
	general?: BottomContentData;
	article?: BottomContentData;
	customerCase?: BottomContentData;
	transportPage?: BottomContentData;
	infoPage?: BottomContentData;
	homePage?: BottomContentData;
	search?: BottomContentData;
	notFound?: BottomContentData;
};

export type BottomContentData = {
	blocks?: Block[];
};