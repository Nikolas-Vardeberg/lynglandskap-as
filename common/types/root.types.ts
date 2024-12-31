import { SanityDocument } from "next-sanity";
import { Image } from "sanity";
import { Editor } from "./editor.types";
import { Tag } from "./tag.types";
import { BottomContentData } from "./layout/bottom-content.types";
import { Article } from "./pages/article.types";
import { TransportPage } from "./pages/transport-page.types";
import { CustomerCase } from "./pages/customer-case.types";
import { InfoPage } from "./pages/info-page.types";


export type Override<T, U> = Omit<T, keyof U> & U;
export type Nullable<T> = T | null;

export type SanityContentTypeBase<T extends string> = Override<
	SanityDocument,
	{
		_type: T;
	}
>;

export type LynglandskapImage = {
	data?: {
		altText?: Nullable<string>;
		description?: Nullable<string>;
	};
	description?: string;
	altTextOverride?: string;
	aspect?: 'auto' | '1:1' | '4:3' | '16:9' | '16:10' | '32:9';
	width?: number;
	dimensions?: {
		width: number;
		height: number;
	};
	lqip: string;
	_type: 'image';
} & Image;

export type SEO = {
	title: string;
	description: string;
	keywords: string[];
	robots?: 'index,follow' | 'noindex,nofollow' | 'noindex' | 'nofollow' | 'index' | 'follow';
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type SanityRichtTextType = any[];

export type Page = Article | TransportPage | CustomerCase | InfoPage;
export type PageType = Page['_type'];

export type BasePage = {
	_id: string;
	_type: string;
	_createdAt: string;

	title: string;
	slug: string;
	tags: Tag[];
	publishedAt: string;
	editor?: Editor;

	entry?: SanityRichtTextType;
	darkMode?: boolean;
	mainImage?: LynglandskapImage;
	seo: SEO;
	teaser: {
		title: string;
		text?: SanityRichtTextType;
		image?: LynglandskapImage;
		teaserLabel: string;
	};
	overrideBottomContent: boolean;
	bottomContent?: BottomContentData;
};