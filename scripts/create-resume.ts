#! bun
import chokidar from 'chokidar';
import meow from 'meow';
import path from 'path';
import puppeteer from 'puppeteer';

async function createResume({ output }: { output: string }) {
	const browser = await puppeteer.launch();
	try {
		const page = await browser.newPage();
		await page.goto('http://localhost:5173/resume');
		await page.pdf({ path: output, format: 'A4' });
	} finally {
		await browser.close();
	}
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

	if (cli.flags.watch) {
		const watcher = chokidar.watch([
			path.join(import.meta.dir, '../src/routes/resume/+page.svelte'),
			path.join(import.meta.dir, '../src/lib/assets/content.ts')
		]);
		watcher.on('change', async () => {
			await createResume({ output: cli.flags.output });
		});
		watcher.on('ready', async () => {
			await createResume({ output: cli.flags.output });
		});
	} else {
		createResume({ output: cli.flags.output });
	}
}
