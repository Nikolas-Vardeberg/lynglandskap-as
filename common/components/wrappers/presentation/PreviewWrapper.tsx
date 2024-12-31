import { isDraftMode } from '@/lib/locale';
import type { QueryResponseInitial } from '@sanity/react-loader';
import type { QueryParams, SanityDocument } from 'next-sanity';
import { notFound } from 'next/navigation';
import Preview from './Preview';
import type { JSX } from "react";

type Props<T = SanityDocument> = {
	initial: QueryResponseInitial<T>;
	params?: QueryParams;
	query: string;
	component: ({ data }: { data: T }) => JSX.Element;
};

export default async function PreviewWrapper<G>({ component: Component, initial, query, params }: Props<G>) {
	const isDraft = await isDraftMode();

	if (!isDraft && !initial.data) return notFound();

	return isDraft ? (
		<Preview initial={initial} params={params} q={query} component={Component} />
	) : (
		<Component data={initial.data} />
	);
}