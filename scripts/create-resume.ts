#! bun
import { spawn } from 'bun';
import chokidar from 'chokidar';
import meow from 'meow';
import path from 'path';
import puppeteer, { type Browser, LaunchOptions } from 'puppeteer';

class ResumeBrowser {
	constructor(private readonly browser: Browser) {}

	[Symbol.asyncDispose]() {
		return this.browser.close();
	}

	static async create(options: LaunchOptions = {}) {
		const browser = await puppeteer.launch(options);
		return new ResumeBrowser(browser);
	}

	async createResume(output: string) {
		const page = await this.browser.newPage();
		await page.goto('http://localhost:5173/resume');
		await page.pdf({ path: output, format: 'A4' });
		console.log(`Resume created at ${output}`);
	}
}

async function startDevServer(): Promise<AsyncDisposable> {
	const server = spawn(['bun', 'dev']);
	const decoder = new TextDecoder();
	for await (const chunk of server.stdout.values()) {
		const text = decoder.decode(chunk);
		if (text.includes('ready')) break;
	}
	return {
		[Symbol.asyncDispose]: async () => {
			server.kill();
		}
	};
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

	await using browser = await ResumeBrowser.create();
	process.on('beforeExit', async () => {
		await browser.close();
	});
	await using _server = await startDevServer();

	if (cli.flags.watch) {
		const watcher = chokidar.watch([
			path.join(import.meta.dir, '../src/routes/resume/+page.svelte'),
			path.join(import.meta.dir, '../src/lib/assets/content.ts')
		]);
		watcher.on('change', async () => {
			await browser.createResume(cli.flags.output);
		});
		watcher.on('ready', async () => {
			await browser.createResume(cli.flags.output);
		});
	} else {
		await browser.createResume(cli.flags.output);
	}
}
