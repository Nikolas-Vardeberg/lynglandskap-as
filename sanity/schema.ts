import type { SchemaTypeDefinition } from 'sanity';
import objects from './schemas/objects';
import { homePage } from './schemas/pages/home-page.schema';
import { article } from './schemas/pages/article.schema';
import { customerCase, industry } from './schemas/pages/customer-case.schema';
import { transportPage } from './schemas/pages/transport.schema';
import { menu } from './schemas/menu.schema';
import { partner } from './schemas/partner.schema';
import { tag } from './schemas/tag.schema';
import { seo } from './schemas/seo.schema';
import { editor } from './schemas/editor.schema';
import { blockAreaDefaults } from './schemas/block-area-defaults.schema';
import { infoPage } from './schemas/pages/info-page.schema';
import { tagCategorySchema } from './schemas/tag-category.schema';

export const schemaTypes = [
    homePage,
    article,
    customerCase,
    infoPage,
    industry,
    tagCategorySchema,
    transportPage,
    menu,
    partner,
    tag,
    seo,
    editor,
    blockAreaDefaults,
	...objects,
];

export const schema: {
	types: SchemaTypeDefinition[];
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	templates: (prev: any[]) => any[];
} = {
	types: schemaTypes,
	templates: (prev) => [...prev],
};