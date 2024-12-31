import { groq } from 'next-sanity';
import { PAGE_REFERENCE_QUERY } from './page/page.queries';

export const PARTNER_QUERY = groq`{
    _id,
    _type,
    _createdAt,
    name,
    "logo": {
        ...logo,
        "url": logo.asset->url
    },
    "page": {
        "nb": page.nb->${PAGE_REFERENCE_QUERY},
        "sv": page.sv->${PAGE_REFERENCE_QUERY},
    },
    "teaserText": teaserText,
}`;