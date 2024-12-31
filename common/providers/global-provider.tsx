'use client';

import { queryClient } from '@/lib/react-query/config';
import type { RootData } from '@/types/root.types';
import { QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode, createContext, useContext } from 'react';

export const GlobalContext = createContext({} as RootData);

export const GlobalProvider = ({ children, data }: { children: ReactNode; data: RootData }) => {
	return <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>;
};

export const QueryProvider = ({ children }: { children: ReactNode }) => {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export const useGlobalContext = () => {
	const context = useContext(GlobalContext);

	if (context === undefined) {
		throw new Error('useGlobalContext must be used within a GlobalProvider');
	}

	return context;
};