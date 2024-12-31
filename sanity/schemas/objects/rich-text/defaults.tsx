import type { PropsWithChildren } from 'react';
import type { ArrayOfType } from 'sanity';

export const getDefaultBlockSetup = ({
	headingLevels = [],
	lists = false,
	annotations,
}: {
	headingLevels?: Array<'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;
	lists?: boolean;
	annotations?: ArrayOfType<'object' | 'reference', undefined>[];
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
}): Array<any> => {
	return [
		{
			type: 'block',
			styles: [
				{ title: 'Normal', value: 'normal' },
				headingLevels.includes('h2') && {
					title: 'Overskrift h2',
					value: 'h2',
					component: ({ children }: PropsWithChildren) => (
						<span style={{ fontSize: '1.5rem' }}> {children} </span>
					),
				},
				headingLevels.includes('h3') && {
					title: 'Overskrift h3',
					value: 'h3',
					component: ({ children }: PropsWithChildren) => (
						<span style={{ fontSize: '1.25rem' }}> {children} </span>
					),
				},
				headingLevels.includes('h4') && {
					title: 'Overskrift h4',
					value: 'h4',
					component: ({ children }: PropsWithChildren) => (
						<span style={{ fontSize: '1.125rem' }}> {children} </span>
					),
				},

				headingLevels.includes('h5') && {
					title: 'Overskrift h5',
					value: 'h5',
					component: ({ children }: PropsWithChildren) => (
						<span style={{ fontSize: '1.1rem' }}> {children} </span>
					),
				},

				headingLevels.includes('h6') && {
					title: 'Overskrift h6',
					value: 'h6',
					component: ({ children }: PropsWithChildren) => (
						<span style={{ fontSize: '1rem' }}> {children} </span>
					),
				},
			].filter(Boolean),
			marks: {
				decorators: [
					{ title: 'Fet', value: 'strong' },
					{ title: 'Kursiv', value: 'em' },
				],
				annotations: annotations ?? [],
			},
			lists: lists
				? [
						{ title: 'Nummerert liste', value: 'number' },
						{ title: 'Punktliste', value: 'bullet' },
					]
				: [],
		},
	];
};