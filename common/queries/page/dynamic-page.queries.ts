import { groq } from 'next-sanity';
import { BLOCKS_QUERY } from '../blocks';
import { TEASER_QUERY } from '../teaser.queries';
import { TAG_QUERY } from '../other/tag.queries';
import { RICH_TEXT_QUERY } from '../rich-text.queries';
import { EDITOR_QUERY } from '../editor.queries';
import { IMAGE_QUERY } from '../image.queries';

export const DYNAMIC_PAGE_RAW_QUERY = groq`{
    _id,
    _type,
    title,
    entry[]${RICH_TEXT_QUERY},
    tags[]->${TAG_QUERY},

    mainImage ${IMAGE_QUERY},

    seo,
    publishedAt,

    editor->${EDITOR_QUERY},

    "teaser": ${TEASER_QUERY},
    "slug": coalesce(slug.current, "page-not-found"),


    overrideBottomContent,
    ...select(overrideBottomContent == true =>{
        bottomContent {
            ...,
            title,
            blocks[]${BLOCKS_QUERY},
            showRealatedPages
        }
    }, null),
}`;