export const slugify = (text: string) => {
	return text
		?.toString()
		.toLowerCase()
		.normalize('NFD')
		.trim()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '');
};

export const sanitize = (text: string) => {
	return text
		?.toString()
		.replace(/\u200B/g, '')
		.replace(/\u200C/g, '')
		.replace(/\u200D/g, '')
		.replace(/\uFEFF/g, '')
		.trim();
};