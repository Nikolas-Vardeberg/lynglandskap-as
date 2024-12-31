import { groq } from 'next-sanity';
import { PARTNER_QUERY } from '../partners.queries';

export const PARTNERS_BLOCK_QUERY = groq`{
    "partners": select(
        handpicked == true => partners[]->${PARTNER_QUERY},
        *[_type == "partner"]${PARTNER_QUERY} 
    )
}`;