import { error, type ServerLoad } from '@sveltejs/kit';
import { dev } from '$app/environment';

export const load: ServerLoad = async () => {
	if (!dev) error(404, 'Not Found');
};