import { ExternalPageReference, Page } from "@/types/root.types";

export const buildUrl = (
    page?:
        | Page
        | ExternalPageReference
) => {
    if (!page) {
        console.error('No page provided');
        return '#';
    }

    if (!page._type) {
        console.error('No _type provided for page', page);
    }

    switch (page._type) {
        case 'article':
            return `/artikler/${page.slug}`;

        case 'infoPage':
            return `/${page.slug}`;

        case "transportPage":
            return `/${page.slug}`;

        case "customerCase":
            return `/kundereferanser/${page.slug}`;

        default: ""; 
    }
};