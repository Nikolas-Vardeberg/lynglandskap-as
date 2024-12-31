import type { Block } from '@/types/blocks/blocks.types';
import type { BasePage, LynglandskapImage, SanityContentTypeBase, SanityRichtTextType } from '../root.types';

export type Article = BasePage & {
	mainImage: LynglandskapImage;
	content: SanityRichtTextType;
	category?: 'none' | 'blogg' | 'news' | 'employeeHistory';
	blockArea?: Block[];
} & SanityContentTypeBase<'article'>;