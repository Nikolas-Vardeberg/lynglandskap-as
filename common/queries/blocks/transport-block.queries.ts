import { groq } from 'next-sanity';
import { IMAGE_QUERY } from '../image.queries';
import { TAG_QUERY } from '../other/tag.queries';
import { TEASER_QUERY } from '../teaser.queries';
import { PAGE_REFERENCE_QUERY } from '../page/page.queries';

export const TRANSPORT_BLOCKS_QUERIES = groq`{
    ...,
    flipHorizontal,
    title,
    pages[]{
        _type,
        _ref,
        "isReference": defined(_ref),
        ...select(
            defined(_ref) => @->${PAGE_REFERENCE_QUERY},
            defined(page) => @.page->{
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
            },
            {
                "title": title,
                "url": url,
                "teaser": {
                    "title": title,
                    "text": teaserText,
                    "image": image ${IMAGE_QUERY}
                }
            }
        )
    },
    moreLink -> ${PAGE_REFERENCE_QUERY},
    moreLinkTitle,
}`;