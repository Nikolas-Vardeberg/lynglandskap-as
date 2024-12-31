import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId, useCdn } from '../env';

export const client = createClient({
	apiVersion,
	dataset,
	projectId,
	useCdn,
	perspective: 'published',
	stega: {
		enabled: false,
		studioUrl: '/studio',
	},
});

export const previewClient = createClient({
	apiVersion,
	dataset,
	projectId,
	useCdn: false,
	token: process.env.SANITY_API_READ_TOKEN,
	perspective: 'previewDrafts',
	stega: {
		studioUrl: 'http://localhost:3000/studio',
	},
});