import useLoader from '@/hooks/useLoader';
import { HOMEPAGE_QUERY } from '@/queries/root.queries';
import type { IHomePage } from '@/types/root.types';
import HomeView from '@/views/home-view';
import PreviewWrapper from '@/wrappers/presentation/PreviewWrapper';

const getHook = async () => {
	return useLoader<IHomePage>(HOMEPAGE_QUERY, {});
};

export default async function Home() {
	const initial = await getHook();

	return (
		<PreviewWrapper
			component={HomeView}
			initial={initial}
			query={HOMEPAGE_QUERY}
		/>
	);
}