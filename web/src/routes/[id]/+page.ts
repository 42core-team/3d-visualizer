import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {

	if (!params.id) return error(400, 'No id given.');

	return {
		id: params.id
	};
	
};