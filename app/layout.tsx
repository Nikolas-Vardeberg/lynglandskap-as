import { ROOT_SEO_QUERY } from "@/queries/root.queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import { RootSEO } from "@/types/root.types";
import LynglandskapSEO from "@/utils/seo";
import type { Metadata } from "next";
import localFont from 'next/font/local'

const dovre_social = localFont({ 
  src: "./fonts/DovreSocial-Light.woff2",
  variable: "--font-dovre-social",
});

export const generateMetadata = async (): Promise<Metadata> => {
	const seo: RootSEO = await sanityFetch({
		query: ROOT_SEO_QUERY,
		params: {
			seoId: 'seo',
		},
		tags: ['root', 'layout', 'seo'],
	});

	return await new LynglandskapSEO().layout(seo);
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dovre_social.variable}`}>
      {children}
    </html>
  );
}
