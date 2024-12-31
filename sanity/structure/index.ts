import type { ConfigContext } from 'sanity';
import type { StructureBuilder } from 'sanity/structure';
import { pagesStructure } from './page.structure';

export const structure = (S: StructureBuilder, C: ConfigContext) =>
    S.list()
        .title('Shared content')
        .items([
            pagesStructure(S, C),
        ])