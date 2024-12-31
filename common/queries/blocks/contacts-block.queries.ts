import { groq } from 'next-sanity';
import { EDITOR_QUERY } from '../editor.queries';
import { PAGE_REFERENCE_QUERY } from '../page/page.queries';

export const CONTACTS_BLOCK_QUERY = groq`{
    title,
    description,
    contacts[]->${EDITOR_QUERY},
    moreLink->${PAGE_REFERENCE_QUERY},
    moreLinkTitle,
}`;