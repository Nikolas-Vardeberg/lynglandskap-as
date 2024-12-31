import type { ConfigContext } from 'sanity';
import type { ListItemBuilder, StructureBuilder } from 'sanity/structure';

export type Structure = (S: StructureBuilder, C: ConfigContext) => ListItemBuilder;