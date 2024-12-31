import { defineType } from "sanity"
import { image } from "../objects/image.schema";
import { sectionSchema } from "../objects/section.schema";


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
        {
			type: 'array',
			name: 'sections',
			title: 'Seksjoner',
			of: [sectionSchema],
		},
    ],
    preview: {
		prepare() {
			return {
				title: 'Hjemmeside',
			};
		},
	},
});
	