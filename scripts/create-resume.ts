#! bun
import { Dayjs, Result, sh } from '@danoaky/js-utils';
import chokidar from 'chokidar';
import { readFileSync, writeFileSync } from 'fs';
import { cp } from 'fs/promises';
import meow from 'meow';
import { tmpdir } from 'os';
import path from 'path';

const setDataMode = (mode: 'light' | 'dark') => {
	const appHtmlPath = path.join(import.meta.dir, '../src/app.html');
	const text = readFileSync(appHtmlPath, 'utf8');
	writeFileSync(appHtmlPath, text.replace(/data-mode="(dark|light)"/, `data-mode="${mode}"`));
};

async function createResume(output: string) {
	await sh(`bun playwright pdf "http://localhost:5173/resume" "${output}"`).then(Result.unwrap);
	const date = Dayjs().local().format('YYYY-MM-DD');
	await cp(output, path.join(tmpdir(), `DJB_Resume_${date}.pdf`));
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

	setDataMode('light');
	process.on('exit', () => {
		setDataMode('dark');
	});

	if (cli.flags.watch) {
		const watcher = chokidar.watch([
			path.join(import.meta.dir, '../src/routes/resume/+page.svelte'),
			path.join(import.meta.dir, '../src/lib/assets/content.ts')
		]);
		watcher.on('change', async () => {
			await createResume(cli.flags.output);
		});
		watcher.on('ready', async () => {
			await createResume(cli.flags.output);
		});
	} else {
		await createResume(cli.flags.output);
		process.exit(0);
	}
}
