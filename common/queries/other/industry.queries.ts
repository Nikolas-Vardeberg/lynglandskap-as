import { groq } from 'next-sanity';

export const INDUSTRY_QUERY = groq`{
    title,
    _type,
    _id,
    "slug": coalesce(slug.current, "page-not-found")
}`;