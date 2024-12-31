import type { Structure } from './types';
import { Handshake } from 'lucide-react';

export const partnersStructure: Structure = (S) =>
	S.listItem().title('Partnere').icon(Handshake).child(S.documentTypeList('partner').title('Partnere'));