import { SanityDocument } from "next-sanity";
import { Image } from "sanity";
import { Editor } from "./editor.types";
import { Tag } from "./tag.types";
import { BottomContent, BottomContentData } from "./layout/bottom-content.types";
import { Article } from "./pages/article.types";
import { TransportPage } from "./pages/transport-page.types";
import { CustomerCase } from "./pages/customer-case.types";
import { InfoPage } from "./pages/info-page.types";
import { Block } from "./blocks/blocks.types";
import { IMenu } from "./layout/menu.types";


export type Override<T, U> = Omit<T, keyof U> & U;
export type Nullable<T> = T | null;

export type Subpages = InfoPage | TransportPage;

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

export type IHomePage = {
	_id: string;
	_type: 'homePage';
	mainImage: LynglandskapImage;
	title: string;
	description: SanityRichtTextType;
	sections: CCSection[];
	overrideBottomContent: boolean;
	bottomContent?: BottomContentData;
};

// CrayonConsulting Section
export type CCSection = {
	blocks: Block[];
	color: 'white';
};

export type BlockAreaDefaults = {
	article?: Block[];
	customerCase?: Block[];
	infoPage?: Block[];
	transportPage?: Block[];
	notFound?: Block[];
};

export type RootSEO = {
	title: string;
	template: string;
	description: string;
	baseUrl: string;
	image: LynglandskapImage;
	imageInfo: {
		metadata: {
			dimensions: {
				width: number;
				height: number;
			};
		};
	};
};

export type RichTextPassThroughProps = {
	spanStart?: SizeProps;
	span?: SizeProps;
	wrapperClassName?: string;
	classNameByType?: (type: string) => string;
};

export interface SizeProps {
	sm?: number;
	lg?: number;
}

export type ExternalPageReference = SanityDocument & {
	_type: 'externalPageReference';
	teaser: BasePage['teaser'];
	url: string;
};

export type SimplePageReference = {
	_id: string;
	_type: string;
	title: string;
	slug: string;
};

export type RootData = {
	menu: IMenu;
	bottomContent: BottomContent;
	blockAreaDefaults: BlockAreaDefaults;
};