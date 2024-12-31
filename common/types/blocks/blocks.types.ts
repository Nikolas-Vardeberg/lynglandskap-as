import { IContactsBlock } from "./contact.types";
import { IImageGallery } from "./image-gallery.types";
import { ISanityImage } from "./image.types";
import { ISimplerTextObject } from "./simpler-text.types";
import { IVideo } from "./video.types";

export type Block = (
    | IEmbedBlock
    | IContactsBlock
    | IImageGallery
    | ISanityImage
    | ISimplerTextObject
    | IVideo
) & {
	_key?: string;
};

export type IEmbedBlock = {
	_type: 'embedBlock';
	embed: string;
};