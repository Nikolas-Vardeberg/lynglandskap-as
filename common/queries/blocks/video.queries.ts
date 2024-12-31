import { groq } from 'next-sanity';

export const VIDEO_BLOCK_QUERY = groq`{
    ... @->{
        title,
        description,
        embed,
        service,
    }
}`;