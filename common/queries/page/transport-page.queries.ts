import { groq } from 'next-sanity';
import { BLOCKS_QUERY } from '../blocks';
import { DYNAMIC_PAGE_RAW_QUERY } from './dynamic-page.queries';

export const TRANSPORT_PAGE_RAW_QUERY = groq`{
    ...${DYNAMIC_PAGE_RAW_QUERY},
    variant,
    blocks[]${BLOCKS_QUERY},
    blockArea[] ${BLOCKS_QUERY}
}`;

export const TRANSPORT_PAGE_QUERY = groq`*[_type == "transportPage" && (slug.current == $slug)][0]${TRANSPORT_PAGE_RAW_QUERY}`;

export const TRANSPORT_PAGE_ID_QUERY = groq`*[_type == "transportPage" && _id == $id][0]${TRANSPORT_PAGE_RAW_QUERY}`;