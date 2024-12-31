import { defineType } from "sanity"
import { image } from "../objects/image.schema";


export const homePage = defineType({
    type: 'document',
	name: 'homePage',
	title: 'Hjemmeside',
    fields: [
        {
            name: 'title',
			type: 'string',
			title: 'Tittel',
        },
        {
            name: 'description',
			type: 'simpleRichText',
			title: 'Beskrivelse',
        },
        image({
            name: 'mainImage',
            title: 'Hoved Bildet',
            description: 'Bilde som brukes i hero-banner på forsiden. Brukes også for SEO og sosiale medier.',
        }),
    ],
    preview: {
		prepare() {
			return {
				title: 'Hjemmeside',
			};
		},
	},
});
	