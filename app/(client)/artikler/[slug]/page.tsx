import type { QueryParams } from 'next-sanity';

import useLoader from "@/hooks/useLoader";
import { ARTICLE_QUERY } from "@/queries/page/article.queries";
import { Article } from "@/types/pages/article.types";
import { notFound, permanentRedirect, RedirectType } from "next/navigation";
import PreviewWrapper from '@/wrappers/presentation/PreviewWrapper';
import ArticleView from '@/views/article-view';

type PageProps = {
	params: Promise<{
		slug: string;
	}>;
};

export const dynamic = 'force-dynamic';

const getHook = async ({ params }: { params: QueryParams }) => {
	return useLoader<Article>(ARTICLE_QUERY, { ...params });
};

export default async function Page(props: PageProps) {
    const params = await props.params;
	const initial = await getHook({ params });

	if (!initial.data) return notFound();

	if (initial.data.slug !== params.slug) {
		return permanentRedirect(`/artikler/${initial.data.slug}`, RedirectType.replace);
	}

	return (
		<PreviewWrapper
			component={ArticleView}
			initial={initial}
			params={{
				...params,
			}}
			query={ARTICLE_QUERY}
		/>
	);
}