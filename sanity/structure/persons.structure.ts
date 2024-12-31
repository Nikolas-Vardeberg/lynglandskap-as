import { UsersRound } from 'lucide-react';
import { Structure } from './types';

export const personsStructure: Structure = (S) =>
	S.listItem()
		.title('Personer')
		.icon(UsersRound)
		.id('editors')
		.child(
			S.list()
				.title('Personer')
				.id('editors_list')
				.items([
					S.listItem()
						.icon(UsersRound)
						.title('Alle personer')
						.child(
							S.documentList()
								.title('Personer')
								.filter('isEditor == $value && _type == $type')
								.apiVersion('2024-01-15')
								.params({ value: false, type: 'editor' }),
						),
					S.listItem()
						.icon(UsersRound)
						.title('Alle redaktører')
						.child(
							S.documentList()
								.title('Redaktører')
								.filter('isEditor == $value && _type == $type')
								.apiVersion('2024-01-15')
								.params({ value: true, type: 'editor' }),
						),
				]),
		);