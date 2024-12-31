import { groq } from 'next-sanity';

export const TAG_QUERY = groq`{
    _id,
    _type,
    "title": title[_key == $locale][0].value,
    "slug": coalesce(slug.current, "page-not-found")
}`;