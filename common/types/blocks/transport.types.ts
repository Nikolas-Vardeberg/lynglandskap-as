import type { PortableTextBlock } from '@portabletext/react';
import type { ExternalPageReference, Page } from '../root.types';

export type TransportHeaderProps = {
	title?: string;
	description?: PortableTextBlock[];
	moreLink?: Page;
	moreLinkTitle?: string;
};

export type ITransportBlock = {
	_type: 'transportBlocks';
	flipHorizontal?: boolean;
	hideImage?: boolean;
	pages: (Page | ExternalPageReference)[];
	variant?: string;
	options?: {
		hideLabel: boolean;
		hideTags: boolean;
	};
	noMargin?: boolean;
} & TransportHeaderProps;

export interface TransportGridProps {
	pages: Page[];
	compact?: boolean;
	hideImage?: boolean;
	block: ITransportBlock;
}

export interface GridProps {
	compact?: boolean;
	pages: Page[];
	block: ITransportBlock;
	hideImage?: boolean;
}

export interface TransportItemProps {
	compact?: boolean;
	flex?: boolean;
	block: ITransportBlock;
	page: Page;
	hideImage?: boolean;
	span?: boolean;
}