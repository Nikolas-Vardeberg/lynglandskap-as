import { groq } from 'next-sanity';
import { BLOCKS_QUERY } from '../blocks';
import { DYNAMIC_PAGE_RAW_QUERY } from './dynamic-page.queries';

export const RAW_INFO_PAGE_QUERY = groq`{
    ...${DYNAMIC_PAGE_RAW_QUERY},

    transportPage->{ title, slug },
    blocks[] ${BLOCKS_QUERY},
    blockArea[] ${BLOCKS_QUERY}


}`;

export const INFO_PAGE_QUERY = groq`
    *[_type == "infoPage" && (slug.current == $slug)][0] ${RAW_INFO_PAGE_QUERY}
`;

export const INFO_PAGE_ID_QUERY = groq`
    *[_type == "infoPage" && _id == $id][0] ${RAW_INFO_PAGE_QUERY}
`;