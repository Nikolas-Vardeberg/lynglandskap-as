import { groq } from 'next-sanity';
import { CONTACTS_BLOCK_QUERY } from './blocks/contacts-block.queries';
import { IMAGE_GALLERY_QUERY } from './blocks/image-gallery.queries';
import { VIDEO_BLOCK_QUERY } from './blocks/video.queries';
import { IMAGE_QUERY } from './image.queries';
import { SIMPLE_PAGE_REFERENCE_QUERY } from './page/page.queries';
import { TRANSPORT_BLOCKS_QUERIES } from './blocks/transport-block.queries';

export const RICH_TEXT_QUERY = groq`{
    ...,
    _type,
    _type == "image" => ${IMAGE_QUERY},
    _type == "imageGallery" => ${IMAGE_GALLERY_QUERY},
    _type == "formBlock" => form->{
        title,
        description,
        formId,
        value
    },
    _type == "transportBlocks" => ${TRANSPORT_BLOCKS_QUERIES},
    _type == "contactsBlock" => ${CONTACTS_BLOCK_QUERY},
    _type == "video" => ${VIDEO_BLOCK_QUERY},
    "markDefs": select(
        count(markDefs) > 0 => markDefs[]{
            ...,
            _type == "internalLink" => {
                ...,
                "page": reference-> ${SIMPLE_PAGE_REFERENCE_QUERY}
            },
        },
        []
    ),
}`;

export const SIMPLE_RICH_TEXT_BLOCK_QUERY = groq`{
    _type,
    text[] ${RICH_TEXT_QUERY}
}`;