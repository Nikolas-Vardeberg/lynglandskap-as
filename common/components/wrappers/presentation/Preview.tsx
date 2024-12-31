'use client';

import { type QueryResponseInitial, useQuery } from '@sanity/react-loader';
import type { QueryParams, SanityDocument } from 'next-sanity';
import { notFound } from 'next/navigation';
import type { JSX } from "react";

export default function Preview<T = SanityDocument>({
	initial,
	params,
	q,
	component: Component,
}: {
	initial: QueryResponseInitial<T>;
	params?: QueryParams;
	q: string;
	component: ({ data }: { data: T }) => JSX.Element;
}) {
	const { data } = useQuery<T | null>(q, params, { initial });

	return data ? <Component data={data} /> : notFound();
}