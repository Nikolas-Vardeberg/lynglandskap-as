'use client';

import type { SizeProps } from '@/types/root.types';
import { type ReactNode, createContext } from 'react';

export type RichTextPassThroughProps = {
	spanStart?: SizeProps;
	span?: SizeProps;
	wrapperClassName?: string;
	classNameByType?: (type: string) => string;
};

export const RichTextPropsContext = createContext({} as RichTextPassThroughProps);

const RichTextPropsProvider = ({ children, ...props }: { children: ReactNode } & RichTextPassThroughProps) => (
	<RichTextPropsContext.Provider value={props}>{children}</RichTextPropsContext.Provider>
);

export default RichTextPropsProvider;