import { tagsStructure } from '@/sanity/structure/tags.structure';
import type { ConfigContext } from 'sanity';
import type { StructureBuilder } from 'sanity/structure';
import { blockAreaDefaultsStructure } from './block-area-defaults.structure';
import { personsStructure } from './persons.structure';
import { settingsStructure } from './settings.structure';
import { partnersStructure } from './partner.structure';
import { pagesStructure } from './page.structure';
import { articlesStructure } from './article.structure';
import { videoesStructure } from './videos.structure';

export const structure = (S: StructureBuilder, C: ConfigContext) =>
	S.list()
		.title('Shared content')
		.items([
			personsStructure(S, C),
			partnersStructure(S, C),
			tagsStructure(S, C),
			S.divider(),
			pagesStructure(S, C),
			articlesStructure(S, C),
			videoesStructure(S, C),
			S.divider(),
			blockAreaDefaultsStructure(S, C),
			settingsStructure(S, C),
		]);