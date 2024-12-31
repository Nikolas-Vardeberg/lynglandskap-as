import type { ReactNode } from 'react';
import '../studio.css';

export const metadata = {
	title: "Lynglandskap studio",
	description: "Lynglandskap studio",
};

export default function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	return <body>{children}</body>;
}