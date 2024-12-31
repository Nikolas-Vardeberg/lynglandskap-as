import { groq } from 'next-sanity';
import { IMAGE_QUERY } from '../image.queries';
import { TEASER_QUERY } from '../teaser.queries';
import { TAG_QUERY } from '../other/tag.queries';

export const RAW_PAGE_REFERENCE_QUERY = groq`{
    _id,
    title,
    _type,
    _createdAt,
    mainImage ${IMAGE_QUERY},
    seo,
    "teaser": ${TEASER_QUERY},
    "slug": coalesce(slug.current, "page-not-found"), 
    tags[]->${TAG_QUERY},
    publishedAt
}`;

export const PAGE_REFERENCE_QUERY = groq`{
    _id,
    title,
    _type,
    _createdAt,
    mainImage ${IMAGE_QUERY},
    seo,
    "teaser": ${TEASER_QUERY},
    "slug": coalesce(slug.current, "page-not-found"), 
    tags[]->${TAG_QUERY},
    publishedAt,
}`;

export const SIMPLE_PAGE_REFERENCE_QUERY = groq`{
    _id,
    title,
    _type,
    "slug": coalesce(slug.current, "page-not-found"),
}`;

export const SEO_PAGE_QUERY = groq`
    *[_type == $type  && (slug.current == $slug)][0]${PAGE_REFERENCE_QUERY}
`;