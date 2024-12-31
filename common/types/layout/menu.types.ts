import type { Page, SimplePageReference } from '../root.types';

export type IMenu = {
	contactReference?: Page;
	content: (ISimpleMenuItem | IMegaMenu)[];
};

export type ISimpleMenuItem = {
	_key: string; // Unique key. Can safely be used in React keys
	_type: 'simpleMenuReference';
	reference: SimplePageReference;
	title: string;
};

export type IMegaMenu = {
	_type: 'menuWithChildren';
	_key: string; // Unique key. Can safely be used in React keys
	title: string;
	children: IMegaMenuItem[];
};

export type IMegaMenuItem = {
	_type: 'megaMenuMainReference';
	_key: string; // Unique key. Can safely be used in React keys
	title: string;
	reference: SimplePageReference;
	viewAllText?: string;
	children: IMegaMenuItemSubItem[];
};

export type IMegaMenuItemSubItem = {
	_type: 'megaMenuSubReference';
	_key: string; // Unique key. Can safely be used in React keys
	title: string;
	reference: SimplePageReference;
};