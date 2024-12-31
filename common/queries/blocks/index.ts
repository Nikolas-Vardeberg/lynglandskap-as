import { groq } from 'next-sanity';
import { IMAGE_QUERY } from '../image.queries';
import { CONTACTS_BLOCK_QUERY } from './contacts-block.queries';
import { IMAGE_GALLERY_QUERY } from './image-gallery.queries';
import { PARTNERS_BLOCK_QUERY } from './partners-block.queries';
import { VIDEO_BLOCK_QUERY } from './video.queries';
import { TRANSPORT_BLOCKS_QUERIES } from './transport-block.queries';
import { SIMPLE_RICH_TEXT_BLOCK_QUERY } from '../rich-text.queries';

export const BLOCKS_QUERY = groq`{
    _key,
    _type,
    _type == "transportBlocks" => ${TRANSPORT_BLOCKS_QUERIES},
    _type == "contactsBlock" => ${CONTACTS_BLOCK_QUERY},
    _type == "imageGallery" => ${IMAGE_GALLERY_QUERY},
    _type == "video" => ${VIDEO_BLOCK_QUERY},
    _type == "image" => {
        "image": ${IMAGE_QUERY}
    },
    _type == "simplerRichText" => ${SIMPLE_RICH_TEXT_BLOCK_QUERY},
    _type == "partnersList" => ${PARTNERS_BLOCK_QUERY},
}`;