import { groq } from 'next-sanity';
import { IMAGE_QUERY } from '../image.queries';

export const IMAGE_GALLERY_QUERY = groq`{
    coverMethod,
    images[]{
        _type == "video" => video -> {
            ...,
        },
        _type == "image" => ${IMAGE_QUERY}
    }
}`;