import { groq } from 'next-sanity';
import { IMAGE_QUERY } from '../image.queries';
import { RICH_TEXT_QUERY } from '../rich-text.queries';
import { DYNAMIC_PAGE_RAW_QUERY } from './dynamic-page.queries';
import { BLOCKS_QUERY } from '../blocks';
import { INDUSTRY_QUERY } from '../other/industry.queries';

export const CUSTOMER_CASE_RAW_QUERY = groq`{
    ...${DYNAMIC_PAGE_RAW_QUERY},
    mainImage ${IMAGE_QUERY},
    content[]${RICH_TEXT_QUERY},
    industry[]->${INDUSTRY_QUERY},

    blockArea[]${BLOCKS_QUERY},
}`;

export const CUSTOMER_CASES_QUERY = groq`*[_type == "customerCase"] ${CUSTOMER_CASE_RAW_QUERY}`;

export const CUSTOMER_CASE_QUERY = groq`*[_type == "customerCase" && publishedAt < now() && (slug.current == $slug)][0] ${CUSTOMER_CASE_RAW_QUERY}`;
