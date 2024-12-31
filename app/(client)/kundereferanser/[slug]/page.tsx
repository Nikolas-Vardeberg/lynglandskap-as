import useLoader from "@/hooks/useLoader";
import { CUSTOMER_CASE_QUERY } from "@/queries/page/customer-case.queries";
import { CustomerCase } from "@/types/pages/customer-case.types";
import CustomerCaseView from "@/views/customer-case-view";
import PreviewWrapper from "@/wrappers/presentation/PreviewWrapper";
import type { QueryParams } from 'next-sanity';
import { notFound, permanentRedirect, RedirectType } from "next/navigation";


export const dynamic = 'force-dynamic';

type PageProps = {
	params: Promise<{
		slug: string;
	}>;
};

const getHook = async ({ params }: { params: QueryParams }) => {
	return useLoader<CustomerCase>(CUSTOMER_CASE_QUERY, { ...params });
};

export default async function CustomerCasePage(props: PageProps) {
    const params = await props.params;
	const initial = await getHook({ params });

	if (!initial.data) {
		return notFound();
	}

	if (initial.data?.slug !== params.slug) {
		return permanentRedirect(`/kundereferanser/${initial.data?.slug}`, RedirectType.replace);
	}

    return (
        <PreviewWrapper
            component={CustomerCaseView}
            initial={initial}
            params={{
                ...params,
            }}
            query={CUSTOMER_CASE_QUERY}
        />
    )
}