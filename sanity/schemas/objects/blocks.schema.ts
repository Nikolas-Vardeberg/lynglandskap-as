import { defineField } from 'sanity';
import { imageGallery } from './image-gallery.schema';
import { image } from './image.schema';
import { simplerTextObject } from './rich-text/text';
import { transportBlocks } from './transport.schema';
import { videoReference } from './video.schema';
import { ContactCardBlock } from './contacts-card.schema';
import { contactsBlock } from './contacts.schema';

export const blocks = ({
	...props
}: {
	group?: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	validation?: any;
}) =>
	defineField({
		name: 'blocks',
		type: 'array',
		title: 'Blokker',
		description: 'Innholdsblokker',
		of: [
			simplerTextObject,
			image({
				aspect: true,
				includeWidthOptions: true,
			}), // Image block
			imageGallery, // Image gallery block
			contactsBlock, // Contacts block
			transportBlocks, // Transport block
			videoReference({ name: 'video' }), // Video block
		],
		...props,
	});

export const blockArea = ({ group, title = 'Blokkområde', name = "blockArea", description } = {} as { group?: string; description?: string; title?: string, name?: string }) =>
	defineField({
		name: name || 'blockArea',
		type: 'array',
		title,
		description: description || 'Innholdsblokker',
		of: [
			contactsBlock, // Contacts block
			transportBlocks, // Transport block
		],
		group,
	});