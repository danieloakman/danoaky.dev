import { type ServerLoad, error } from '@sveltejs/kit';

import { dev } from '$app/environment';
import { parseVariant } from '$lib/assets/resume-content';

export const load: ServerLoad = async ({ url }) => {
	if (!dev) error(404, 'Not Found');
	return { variant: parseVariant(url.searchParams.get('variant')) };
};
