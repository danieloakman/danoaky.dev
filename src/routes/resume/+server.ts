import { readFileSync } from 'node:fs';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	try {
		const pdfBuffer = readFileSync('./static/resume.pdf');

		return new Response(pdfBuffer, {
			status: 200,
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': 'inline; filename="resume.pdf"',
				'Content-Length': pdfBuffer.length.toString()
			}
		});
	} catch (error) {
		console.error('Error reading PDF file:', error);
		return new Response('PDF not found', { status: 404 });
	}
};
