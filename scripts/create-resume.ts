#! bun
import { Dayjs, Result, sh } from '@danoaky/js-utils';
import chokidar from 'chokidar';
import { readFileSync, writeFileSync } from 'fs';
import { cp } from 'fs/promises';
import meow from 'meow';
import { tmpdir } from 'os';
import path from 'path';

import { writeResumeDocx } from './resume-docx';

type ResumeFormat = 'pdf' | 'docx' | 'all';

const setDataMode = (mode: 'light' | 'dark') => {
	const appHtmlPath = path.join(import.meta.dir, '../src/app.html');
	const text = readFileSync(appHtmlPath, 'utf8');
	writeFileSync(appHtmlPath, text.replace(/data-mode="(dark|light)"/, `data-mode="${mode}"`));
};

const datedCopyName = (ext: 'pdf' | 'docx') => {
	const date = Dayjs().local().format('YYYY-MM-DD');
	return path.join(tmpdir(), `DJB_Resume_${date}.${ext}`);
};

async function createPdf(output: string) {
	await sh(`bun playwright pdf --paper-format A4 "http://localhost:5173/resume" "${output}"`).then(
		Result.unwrap
	);
	await cp(output, datedCopyName('pdf'));
}

async function createDocx(output: string) {
	await writeResumeDocx(output);
	await cp(output, datedCopyName('docx'));
}

async function createResume(format: ResumeFormat, pdfOutput: string, docxOutput: string) {
	if (format === 'pdf' || format === 'all') {
		await createPdf(pdfOutput);
	}
	if (format === 'docx' || format === 'all') {
		await createDocx(docxOutput);
	}
}

if (import.meta.main) {
	const defaultPdf = path.join(import.meta.dir, '../static/resume.pdf');
	const defaultDocx = path.join(import.meta.dir, '../static/resume.docx');

	const cli = meow(
		`
    Usage
      $ bun run create-resume

    Options
      --format, -f  Output format: pdf | docx | all (default: all)
      --output, -o  Output path (defaults by format; with all, sets PDF path and derives .docx beside it)
      --watch, -w   Watch for changes and re-render the resume
  `,
		{
			importMeta: import.meta,
			flags: {
				format: {
					type: 'string',
					shortFlag: 'f',
					default: 'all'
				},
				output: {
					type: 'string',
					shortFlag: 'o'
				},
				watch: {
					type: 'boolean',
					shortFlag: 'w',
					default: false
				}
			}
		}
	);

	const format = cli.flags.format as ResumeFormat;
	if (!['pdf', 'docx', 'all'].includes(format)) {
		console.error(`Invalid --format "${cli.flags.format}". Use pdf, docx, or all.`);
		process.exit(1);
	}

	let pdfOutput = defaultPdf;
	let docxOutput = defaultDocx;

	if (cli.flags.output) {
		if (format === 'docx') {
			docxOutput = cli.flags.output;
		} else if (format === 'pdf') {
			pdfOutput = cli.flags.output;
		} else {
			pdfOutput = cli.flags.output;
			docxOutput = path.join(
				path.dirname(cli.flags.output),
				`${path.basename(cli.flags.output, path.extname(cli.flags.output))}.docx`
			);
		}
	}

	const needsPdf = format === 'pdf' || format === 'all';
	if (needsPdf) {
		setDataMode('light');
		process.on('exit', () => {
			setDataMode('dark');
		});
	}

	const run = () => createResume(format, pdfOutput, docxOutput);

	if (cli.flags.watch) {
		const watchPaths = [path.join(import.meta.dir, '../src/lib/assets/content.ts')];
		if (needsPdf) {
			watchPaths.push(
				path.join(import.meta.dir, '../src/routes/resume/+page.svelte'),
				path.join(import.meta.dir, '../src/routes/resume/one-page.svelte')
			);
		}
		const watcher = chokidar.watch(watchPaths);
		watcher.on('change', async () => {
			await run();
		});
		watcher.on('ready', async () => {
			await run();
		});
	} else {
		await run();
		process.exit(0);
	}
}
