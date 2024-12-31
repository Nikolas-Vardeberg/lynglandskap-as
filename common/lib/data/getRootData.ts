import {
	BLOCK_AREA_DEFAULTS_QUERY,
	BOTTOMCONTENTS_QUERY,
	MENU_QUERY,
} from '@/queries/root.queries';
import { sanityFetch } from '@/sanity/lib/fetch';
import type { RootData } from '@/types/root.types';
import { groq } from 'next-sanity';
import { draftMode } from 'next/headers';

const getLayoutData = async () => {
	const { isEnabled } = await draftMode();

	const { menu, bottomContent, blockAreaDefaults } = await sanityFetch({
		query: groq`{
			"menu": ${MENU_QUERY},
			"bottomContent": ${BOTTOMCONTENTS_QUERY},
			"blockAreaDefaults": ${BLOCK_AREA_DEFAULTS_QUERY}
		}`,
		params: {
			menuId: 'menu',
			bottomContentId: 'bottomContent',
			blockAreaDefaultsId: 'blockAreaDefaults',
		},
		stega: isEnabled,
	});

	const data = {
		menu,
		bottomContent,
		blockAreaDefaults,
	};

	return data;
};

const getRootData = async (): Promise<RootData> => {
	const {  menu, bottomContent, blockAreaDefaults } = await getLayoutData();

	return {
		menu,
		bottomContent,
		blockAreaDefaults
	};
};

export default getRootData;