import { groq } from "next-sanity";
import { BLOCKS_QUERY } from "./blocks";
import { IMAGE_QUERY } from "./image.queries";
import { PAGE_REFERENCE_QUERY, SIMPLE_PAGE_REFERENCE_QUERY } from "./page/page.queries";
import { RICH_TEXT_QUERY, SIMPLE_RICH_TEXT_BLOCK_QUERY } from "./rich-text.queries";


export const MENU_QUERY = groq`*[_id==$menuId][0] {
    contactReference->${PAGE_REFERENCE_QUERY},
    "content": menuContent[] {
        _type,
        _key,
        title,
        _type == "simpleMenuReference" => {
            reference->${SIMPLE_PAGE_REFERENCE_QUERY},
        },
        
        _type == "menuWithChildren" => {
            children[] {
                _type,
                _key,
                reference->${SIMPLE_PAGE_REFERENCE_QUERY},
                viewAllText,
                title,
                children[] {
                    title,
                    _key,
                    _type,
                    reference->${SIMPLE_PAGE_REFERENCE_QUERY}
                }
            }
        }
    }
}`;

export const HOMEPAGE_QUERY = groq`*[_id==$homepageId][0] {  
    _id,
    _type,
    title,
    description,
    "sections": sections[] {
        ...,
        blocks[] ${BLOCKS_QUERY},
    }
}`;


export const BOTTOMCONTENT_QUERY = groq`{
    title,
    blocks[]${BLOCKS_QUERY},
    showRealatedPages
}`;

export const BOTTOMCONTENTS_QUERY = groq`*[_id==$bottomContentId][0]{
    ...,
    _type,
    _id,
    general ${BOTTOMCONTENT_QUERY},
    article ${BOTTOMCONTENT_QUERY},
    customerCase ${BOTTOMCONTENT_QUERY},
    transportPage ${BOTTOMCONTENT_QUERY},
    infoPage ${BOTTOMCONTENT_QUERY},
    homePage ${BOTTOMCONTENT_QUERY},
    search ${BOTTOMCONTENT_QUERY},
    notFound ${BOTTOMCONTENT_QUERY},
}`;

export const ROOT_SEO_QUERY = groq`*[_id==$seoId][0]{
    title,
    template,
    description,
    baseUrl,
    image ${IMAGE_QUERY},
    "imageInfo": image.asset->{
        metadata {
            dimensions {
                width,
                height   
            }
        }
    },
}`;

export const BLOCK_AREA_DEFAULTS_QUERY = groq`*[_id==$blockAreaDefaultsId][0] {
    article[] ${BLOCKS_QUERY},
    customerCase[] ${BLOCKS_QUERY},
    transportPage[] ${BLOCKS_QUERY},
    infoPage[] ${BLOCKS_QUERY},
    notFound[] ${BLOCKS_QUERY}
}`;