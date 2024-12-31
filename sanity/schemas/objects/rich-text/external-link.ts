import { defineField } from "sanity";
import { SquareArrowOutUpRight } from 'lucide-react';
import { LI } from '@/atoms/icon';

export const externalLink = defineField({
    name: 'externalLink',
    type: 'object',
    title: 'Ekstern lenke',
    // @ts-ignore
    icon: LI(SquareArrowOutUpRight, { width: 16, height: 16 }),
    fields: [
        {
            name: 'href',
            type: 'url',
            title: 'URL',
            validation: (R) => [
                R.uri({
                    scheme: ['https', 'mailto', 'tel'],
                }).error('URL must be a valid URL'),
            ],
        },
        {
            title: 'Åpne i ny fane',
            name: 'blank',
            type: 'boolean',
            initialValue: false,
        },
    ],
});