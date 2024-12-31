import type { Page } from '../root.types';
import type { IPartner } from '../partner.types';

export type IPartnerBlock = {
	_type: 'partnersList';
	partners: IPartner[];
	moreLink?: Page;
	moreLinkTitle?: string;
};