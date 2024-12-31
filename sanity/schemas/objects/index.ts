import { externalLink } from './external-link.schema';
import { internalLink } from './internal-link.schema';
import { entryRichText, factBlockRichText, richText, simpleRichText, simplerRichText, } from "./rich-text/text";
import { video } from './video.schema';

export default [richText, entryRichText, simpleRichText, factBlockRichText, simplerRichText, externalLink, internalLink, video];