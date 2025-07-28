#! bun
import chokidar from 'chokidar';
import { readFileSync, writeFileSync } from 'fs';
import meow from 'meow';
import path from 'path';
import puppeteer, { type Browser } from 'puppeteer';

const setDataMode = (mode: 'light' | 'dark') => {
	const appHtmlPath = path.join(import.meta.dir, '../src/app.html');
	const text = readFileSync(appHtmlPath, 'utf8');
	writeFileSync(appHtmlPath, text.replace(/data-mode="(dark|light)"/, `data-mode="${mode}"`));
};

async function createResume(browser: Browser, output: string) {
	const page = await browser.newPage();
	await page.goto('http://localhost:5173/resume');
	await page.pdf({ path: output, format: 'A4', printBackground: true });
	await page.close();
}

if (import.meta.main) {
	const cli = meow(
		`
    Usage
      $ bun run create-resume

    Options
      --output, -o  The output file path
      --watch, -w   Watch for changes and re-render the resume
  `,
		{
			importMeta: import.meta,
			flags: {
				output: {
					type: 'string',
					shortFlag: 'o',
					default: path.join(import.meta.dir, '../static/resume.pdf')
				},
				watch: {
					type: 'boolean',
					shortFlag: 'w',
					default: false
				}
			}
		}
	);

	const browser = await puppeteer.launch();
	setDataMode('light');
	process.on('exit', () => {
		setDataMode('dark');
		browser.close();
	});

	if (cli.flags.watch) {
		const watcher = chokidar.watch([
			path.join(import.meta.dir, '../src/routes/resume/+page.svelte'),
			path.join(import.meta.dir, '../src/lib/assets/content.ts')
		]);
		watcher.on('change', async () => {
			await createResume(browser, cli.flags.output);
		});
		watcher.on('ready', async () => {
			await createResume(browser, cli.flags.output);
		});
	} else {
		await createResume(browser, cli.flags.output);
	}
}
