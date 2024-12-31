import 'server-only';
import { isDraftMode } from '@/lib/locale';
import { loadQuery } from '@/sanity/lib/store';
import type { QueryParams } from 'next-sanity';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const useLoader = async <T = any>(q: string, params: QueryParams) => {
	const enabled = await isDraftMode();
	if (enabled) {
		return loadQuery<T>(q, params, {
			// cache: process.env.NODE_ENV === 'development' ? 'no-cache' : 'force-cache',
			cache: 'no-cache',
			perspective: 'previewDrafts',
		});
	}

	const res = await loadQuery<T>(q, params, {
		// cache: process.env.NODE_ENV === 'development' ? 'no-cache' : 'force-cache',
		cache: 'no-cache',
		perspective: 'published',
	});

	if (res.data === null) return res;

	return res;
};

export default useLoader;