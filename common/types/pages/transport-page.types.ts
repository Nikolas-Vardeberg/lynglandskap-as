import type { Block } from '../blocks/blocks.types';
import type { BasePage, SanityContentTypeBase } from '../root.types';

export type TransportPage = BasePage & {
	blocks: Block[];
} & SanityContentTypeBase<'transportPage'>;

export type TransportPageReference = {
	title: string;
	slug: string;
};