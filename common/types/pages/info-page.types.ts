import type { Block } from '../blocks/blocks.types';
import type { BasePage, SanityContentTypeBase } from '../root.types';

export type InfoPage = BasePage & {
	blocks: Block[];
} & SanityContentTypeBase<'infoPage'> ;