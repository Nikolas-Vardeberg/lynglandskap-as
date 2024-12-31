import { groq } from 'next-sanity';
import { IMAGE_QUERY } from './image.queries';

export const EDITOR_QUERY = groq`{
    name,
    "title": title,
    "department": department,
    "email" : mail,
    company,
    location,
    phone,
    linkedin,
    image ${IMAGE_QUERY},
    bookMeetingLink
}`;