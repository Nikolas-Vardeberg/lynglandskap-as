import { urlFor } from '@/sanity/lib/image';
import type { LynglandskapImage, Nullable, Page, RootSEO } from '@/types/root.types';
import { toPlainText } from '@portabletext/react';
import type { Metadata } from 'next';
import SITE_CONFIG from '../../config.lynglandskap';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const tryGetRichtext = (text: any[]): string => {
	try {
		return toPlainText(text);
	} catch (e) {
		return '';
	}
};

const defaults = {
	noIndex: 'noindex, nofollow',
	index: 'index, follow',
	image: {
		width: 1200,
		height: 630,
	},
};

// Only available server-side
export default class VertioSeo {
	metadata: Metadata;
	hostname: string;
	metadataBase: URL;
	noIndex: boolean;

	constructor(hostname?: string) {
		this.hostname = hostname || SITE_CONFIG.seo.defaultDomain;
		this.noIndex = SITE_CONFIG.seo.ignoredDomains.some((d) => this.hostname?.includes(d));

		this.metadataBase = new URL(`https://${this.hostname}`);
		this.metadata = {
			title: SITE_CONFIG.seo.title,
			description: SITE_CONFIG.seo.description,
			metadataBase: this.metadataBase,
			robots: this.noIndex ? defaults.noIndex : defaults.index,
			twitter: this.extendMeta(),
			openGraph: this.extendMeta(),
		};
	}

	extendMeta(title?: string, description?: string, image?: LynglandskapImage, url?: string, dimensions = defaults.image) {
		const imgURL = image?.data
			? urlFor(image)?.width(dimensions.width)?.height(dimensions.height)?.url() ?? null
			: null;
		const imgAlt = image?.altText as Nullable<string> | undefined;

		return {
			title: title || SITE_CONFIG.seo.title,
			description: description || SITE_CONFIG.seo.description,
			images: imgURL
				? [
						{
							url: imgURL,
							width: dimensions.width,
							height: dimensions.height,
							alt: imgAlt || SITE_CONFIG.seo.title,
						},
					]
				: [
						{
							url: `https://${this.hostname}/static/images/inmeta-logo.png`,
							width: defaults.image.width,
							height: defaults.image.height,
							alt: SITE_CONFIG.seo.title,
						},
					],
			url,
		};
	}

	async page(page: Page | null) {
		if (!page) return this.metadata;

		const title = page.seo?.title ?? page.teaser?.title ?? page.title;
		const description =
			page.seo?.description ?? tryGetRichtext(page.teaser?.text ?? []) ?? tryGetRichtext(page.entry ?? []);
		const img = page.teaser?.image || page.mainImage;

		const metadata: Metadata = {
			title: title || SITE_CONFIG.seo.title,
			description: description || SITE_CONFIG.seo.description,
			openGraph: this.extendMeta(title, description, img),
			twitter: this.extendMeta(title, description, img),
			robots: this.noIndex ? defaults.noIndex : page.seo?.robots || defaults.index,
		};
		this.metadata = metadata;

		return metadata;
	}

	async layout(props?: RootSEO) {
		if (!props) return this.metadata;

		const imageData = props?.imageInfo?.metadata.dimensions as undefined | { width: number; height: number };

		const metadata = {
			title: {
				default: props.title,
				template: props.template,
			},
			description: props.description,
			metadataBase: this.metadataBase,
			openGraph: this.extendMeta(props.title, props.description, props.image, props.baseUrl, {
				width: imageData?.width ?? defaults.image.width,
				height: imageData?.height ?? defaults.image.height,
			}),
			twitter: this.extendMeta(props.title, props.description, props.image, props.baseUrl, {
				width: imageData?.width ?? defaults.image.width,
				height: imageData?.height ?? defaults.image.height,
			}),
			robots: !this.noIndex
				? SITE_CONFIG.isProd || SITE_CONFIG.isDev
					? defaults.index
					: defaults.noIndex
				: defaults.noIndex,
		};

		this.metadata = metadata;

		return metadata;
	}
}