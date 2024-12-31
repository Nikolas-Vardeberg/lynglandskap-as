import { BLOCKS_QUERY } from '@/queries/blocks';
import { groq } from 'next-sanity';
import { IMAGE_QUERY } from '../image.queries';
import { RICH_TEXT_QUERY } from '../rich-text.queries';
import { DYNAMIC_PAGE_RAW_QUERY } from './dynamic-page.queries';

export const RAW_ARTICLE_QUERY = groq`{
    ...${DYNAMIC_PAGE_RAW_QUERY},
    _id,
    _type,
    darkMode,
    mainImage ${IMAGE_QUERY},
    content[]${RICH_TEXT_QUERY},
    category,
    blockArea[] ${BLOCKS_QUERY}
}`;

export const ARTICLE_QUERY = groq`*[_type == "article" && publishedAt < now() && (slug.current == $slug)][0] ${RAW_ARTICLE_QUERY}`;