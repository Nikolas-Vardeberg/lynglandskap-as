import 'server-only';

import type { ClientPerspective, QueryParams } from 'next-sanity';
import { draftMode } from 'next/headers';
import { client } from './client';
import { token } from './token';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const sanityFetch = async <T = any>({
	query,
	params = {},
	tags,
	// perspective = draftMode()?.isEnabled ? 'previewDrafts' : 'published',
	// stega = perspective === 'previewDrafts',
}: {
	query: string;
	params?: QueryParams;
	tags?: string[];
	perspective?: Omit<ClientPerspective, 'raw'>;
	stega?: boolean;
}) => {
	const isEnabled = await draftMode();
	const perspective = isEnabled ? 'previewDrafts' : 'published';
	const stega = perspective === 'previewDrafts';

	if (perspective === 'previewDrafts') {
		return client.fetch<T>(query, params, {
			perspective: 'previewDrafts',
			stega,
			token,
			useCdn: false,
			cache: 'no-cache',
			next: {
				tags: ['all', ...(tags ?? [])],
			},
		});
	}

	const res = await client.fetch<T>(query, params, {
		stega,
		perspective: 'published',
		cache: 'no-cache',
	});

	return res;
};
