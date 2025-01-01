const SITE_CONFIG = {
	isProd: process.env.NEXT_PUBLIC_VERCEL_ENV === 'production',
	isStaging:
		process.env.NEXT_PUBLIC_VERCEL_ENV === 'staging',
	isDev: process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_VERCEL_ENV,
	seo: {
		title: 'Lynglandskap AS',
		description: 'Lynglandskap AS offisielle nettside',
		ignoredDomains: ['domain.vercel.app'],
		defaultDomain: 'lynglandskap.no',
	},
	fallbackHostName: 'lynglandskap.no',
};

export default SITE_CONFIG;