#! bun
import { RESUME_VARIANTS, type ResumeVariant } from '../src/lib/assets/resume-content';
import { Dayjs, Result, sh } from '@danoaky/js-utils';
import chokidar from 'chokidar';
import { readFileSync, writeFileSync } from 'fs';
import { cp } from 'fs/promises';
import meow from 'meow';
import { tmpdir } from 'os';
import path from 'path';

import { writeResumeDocx } from './resume-docx';

type ResumeFormat = 'pdf' | 'docx' | 'all';
type VariantFlag = ResumeVariant | 'all';

/** The ai variant keeps the plain name; others get a `-<variant>` suffix. */
const variantPath = (file: string, variant: ResumeVariant) =>
	variant === 'ai'
		? file
		: path.join(
				path.dirname(file),
				`${path.basename(file, path.extname(file))}-${variant}${path.extname(file)}`
			);

const setDataMode = (mode: 'light' | 'dark') => {
	const appHtmlPath = path.join(import.meta.dir, '../src/app.html');
	const text = readFileSync(appHtmlPath, 'utf8');
	writeFileSync(appHtmlPath, text.replace(/data-mode="(dark|light)"/, `data-mode="${mode}"`));
};

const datedCopyName = (ext: 'pdf' | 'docx', variant: ResumeVariant) => {
	const date = Dayjs().local().format('YYYY-MM-DD');
	const suffix = variant === 'ai' ? '' : `_${variant}`;
	return path.join(tmpdir(), `DJB_Resume${suffix}_${date}.${ext}`);
};

async function createPdf(output: string, variant: ResumeVariant) {
	await sh(
		`bun playwright pdf --paper-format A4 "http://localhost:5173/resume?variant=${variant}" "${output}"`
	).then(Result.unwrap);
	await cp(output, datedCopyName('pdf', variant));
}

async function createDocx(output: string, variant: ResumeVariant) {
	await writeResumeDocx(output, variant);
	await cp(output, datedCopyName('docx', variant));
}

async function createResume(
	format: ResumeFormat,
	variants: ResumeVariant[],
	pdfOutput: string,
	docxOutput: string
) {
	for (const variant of variants) {
		if (format === 'pdf' || format === 'all') {
			await createPdf(variantPath(pdfOutput, variant), variant);
		}
		if (format === 'docx' || format === 'all') {
			await createDocx(variantPath(docxOutput, variant), variant);
		}
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
      --variant, -v Variant: ai | app | all (default: all)
      --output, -o  Output path for the ai variant (defaults by format; with all, sets PDF path and
                    derives .docx beside it). The app variant gets an -app suffix.
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
				variant: {
					type: 'string',
					shortFlag: 'v',
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

	const variantFlag = cli.flags.variant as VariantFlag;
	if (variantFlag !== 'all' && !RESUME_VARIANTS.includes(variantFlag)) {
		console.error(
			`Invalid --variant "${cli.flags.variant}". Use ${RESUME_VARIANTS.join(', ')}, or all.`
		);
		process.exit(1);
	}
	const variants = variantFlag === 'all' ? [...RESUME_VARIANTS] : [variantFlag];

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

	const run = () => createResume(format, variants, pdfOutput, docxOutput);

	if (cli.flags.watch) {
		const watchPaths = [
			path.join(import.meta.dir, '../src/lib/assets/content.ts'),
			path.join(import.meta.dir, '../src/lib/assets/resume-content.ts')
		];
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
