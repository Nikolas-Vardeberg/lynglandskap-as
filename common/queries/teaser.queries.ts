import { groq } from 'next-sanity';
import { IMAGE_QUERY } from './image.queries';

export const TEASER_QUERY = groq`{
    "title": coalesce(teaserTitle, title),
    "text": coalesce(teaserText, entry),
    "image": coalesce(teaserImage, mainImage) ${IMAGE_QUERY},
    teaserLabel
}`;