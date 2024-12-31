import { groq } from 'next-sanity';

export const TAG_QUERY = groq`{
    _id,
    _type,
    "title": title,
    "slug": coalesce(slug.current, "page-not-found"),
}`;