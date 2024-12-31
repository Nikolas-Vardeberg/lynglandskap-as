import type { Editor } from '../editor.types';
import type { Page } from '../root.types';

export type IContactsBlock = {
	_type?: 'contactsBlock';
	title?: string;
	description?: string;
	contacts: Editor[];
	moreLink?: Page;
	moreLinkTitle?: string;
};