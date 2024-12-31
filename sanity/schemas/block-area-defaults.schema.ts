import { defineType } from "sanity";
import { blockArea } from "./objects/blocks.schema";

export const blockAreaDefaults = defineType({
    name: 'blockAreaDefaults',
    type: 'document',
    title: 'Block Area Defaults',
    fields: [
        blockArea({
            name: 'article',
            title: 'Artikkel',
        }),
        blockArea({
            name: 'customerCase',
            title: 'Kundecaser',
        }),
        blockArea({
            name: 'transportPage',
            title: 'Transport sider',
        }),
        blockArea({
            name: 'infoPage',
            title: 'Undersider',
        }),
        blockArea({
            name: "notFound",
            title: "404 - ikke funnet",
        })
    ],
})