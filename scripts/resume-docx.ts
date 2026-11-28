import { EDUCATION, RESUME_META } from '../src/lib/assets/content';
import {
	ABOUT_ME,
	EDUCATION_TODO,
	EXIT_STATEMENT,
	type ResumeJobView,
	type ResumeVariant,
	SUMMARY,
	jobsFor,
	projectsFor,
	skillTiersFor
} from '../src/lib/assets/resume-content';
import { formatStartEndDates } from '../src/lib/utils/dates';
import {
	AlignmentType,
	BorderStyle,
	Document,
	ExternalHyperlink,
	HeadingLevel,
	type IParagraphOptions,
	LevelFormat,
	Packer,
	Paragraph,
	TabStopType,
	TextRun
} from 'docx';
import { writeFile } from 'fs/promises';

const ACCENT = 'B45309';
const MUTED = '6B7280';

function linkRun(text: string, url: string) {
	return new ExternalHyperlink({
		children: [new TextRun({ text, style: 'Hyperlink', color: ACCENT, underline: {} })],
		link: url
	});
}

function heading(text: string, { pageBreakBefore = false }: { pageBreakBefore?: boolean } = {}) {
	return new Paragraph({
		heading: HeadingLevel.HEADING_2,
		pageBreakBefore,
		spacing: { before: pageBreakBefore ? 0 : 280, after: 80 },
		border: {
			bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT, space: 4 }
		},
		children: [new TextRun({ text, bold: true, color: ACCENT, size: 28 })]
	});
}

function bodyParagraph(options: IParagraphOptions) {
	return new Paragraph({
		spacing: { after: 60 },
		...options
	});
}

function bullet(text: string) {
	return new Paragraph({
		numbering: { reference: 'bullets', level: 0 },
		spacing: { after: 40 },
		children: [new TextRun({ text, size: 20 })]
	});
}

function subHeading(text: string) {
	return bodyParagraph({
		spacing: { before: 60, after: 20 },
		children: [new TextRun({ text, bold: true, size: 20 })]
	});
}

/** Right edge of the text area (A4 width 11906 minus 720 margins either side). */
const RIGHT_TAB = 10466;

function experienceParagraphs(items: ResumeJobView[]) {
	const paragraphs: Paragraph[] = [];

	for (const { company, url, location, about, stints } of items) {
		paragraphs.push(
			bodyParagraph({
				spacing: { before: 160, after: 20 },
				keepNext: true,
				children: [
					linkRun(company, url),
					new TextRun({ text: `  ${location}`, color: MUTED, size: 20 })
				]
			}),
			bodyParagraph({
				keepNext: true,
				children: [new TextRun({ text: about, italics: true, size: 20 })]
			})
		);

		for (const { roles, bullets } of stints) {
			for (const { title, start, end, note } of roles) {
				const dates = formatStartEndDates(start, end);
				paragraphs.push(
					bodyParagraph({
						spacing: { before: 40, after: 20 },
						keepNext: true,
						tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
						children: [
							new TextRun({ text: `${title}${note ? ` (${note})` : ''}`, bold: true, size: 22 }),
							new TextRun({ text: `\t${dates.start} - ${dates.end}`, color: MUTED, size: 20 })
						]
					})
				);
			}
			paragraphs.push(...bullets.map(bullet));
		}
	}

	return paragraphs;
}

export function buildResumeDocument(variant: ResumeVariant = 'ai') {
	const generatedOn = new Date().toLocaleDateString('en-AU', { timeZone: 'Australia/Sydney' });
	const selectedProjects = projectsFor(variant);

	const contactChildren = [
		linkRun(RESUME_META.email, `mailto:${RESUME_META.email}`),
		new TextRun({ text: ' · ', color: MUTED, size: 20 }),
		linkRun(RESUME_META.phone, RESUME_META.phoneHref)
	];

	contactChildren.push(
		new TextRun({ text: ' · ', color: MUTED, size: 20 }),
		new TextRun({ text: RESUME_META.location, size: 20 }),
		new TextRun({ text: ' · ', color: MUTED, size: 20 }),
		new TextRun({ text: RESUME_META.citizenship, size: 20 })
	);

	const children: Paragraph[] = [
		new Paragraph({
			heading: HeadingLevel.TITLE,
			spacing: { after: 80 },
			children: [
				new ExternalHyperlink({
					children: [
						new TextRun({
							text: RESUME_META.name,
							bold: true,
							color: ACCENT,
							size: 48,
							underline: {}
						})
					],
					link: RESUME_META.siteUrl
				})
			]
		}),
		bodyParagraph({
			spacing: { after: 80 },
			children: [new TextRun({ text: SUMMARY[variant], size: 22 })]
		}),
		bodyParagraph({
			spacing: { after: 160 },
			children: contactChildren
		}),
		heading('Skills'),
		...skillTiersFor(variant).flatMap(({ title, content }) => [
			subHeading(title),
			bodyParagraph({ children: [new TextRun({ text: content, size: 20 })] })
		]),
		heading('Experience'),
		...experienceParagraphs(jobsFor(variant)),
		heading('Selected Projects'),
		bodyParagraph({
			children: RESUME_META.links.flatMap(({ label, url }, i) => [
				...(i > 0 ? [new TextRun({ text: ' · ', color: MUTED, size: 20 })] : []),
				linkRun(label, url)
			])
		}),
		...selectedProjects.flatMap(({ name, madeAt, summary, impact, url }) => {
			const title = `${name}${madeAt === 'Personal' ? '' : ` - ${madeAt}`}`;
			return [
				bodyParagraph({
					spacing: { before: 80, after: 20 },
					children: url
						? [linkRun(title, url)]
						: [new TextRun({ text: title, bold: true, size: 20 })]
				}),
				bodyParagraph({
					children: [new TextRun({ text: `${summary} ${impact}`, size: 20 })]
				})
			];
		}),
		bodyParagraph({
			spacing: { before: 60, after: 80 },
			children: [linkRun('View all my projects', 'https://danoaky.dev/projects')]
		}),
		heading('Education & Professional Development'),
		...EDUCATION.map(({ institution, award, end }) =>
			bodyParagraph({
				spacing: { before: 60, after: 40 },
				children: [
					new TextRun({ text: institution, bold: true, size: 20 }),
					new TextRun({
						text: ` — ${award}${end ? ` - ${end.getFullYear()}` : ''}`,
						size: 20
					})
				]
			})
		),
		bodyParagraph({ children: [new TextRun({ text: EDUCATION_TODO, size: 20 })] }),
		heading('Working with people'),
		...ABOUT_ME.flatMap(({ title, content }) => [
			subHeading(title),
			bodyParagraph({ children: [new TextRun({ text: content, size: 20 })] })
		]),
		heading('Next step'),
		bodyParagraph({
			children: [new TextRun({ text: EXIT_STATEMENT, size: 20 })]
		}),
		new Paragraph({
			alignment: AlignmentType.RIGHT,
			spacing: { before: 320 },
			children: [
				linkRun(
					`Generated on ${generatedOn}`,
					'https://github.com/danieloakman/danoaky.dev?tab=readme-ov-file#generating-resume'
				)
			]
		})
	];

	return new Document({
		creator: RESUME_META.name,
		title: `${RESUME_META.name} — Resume`,
		description: SUMMARY[variant],
		styles: {
			default: {
				document: {
					run: { font: 'Calibri', size: 20 }
				}
			}
		},
		numbering: {
			config: [
				{
					reference: 'bullets',
					levels: [
						{
							level: 0,
							format: LevelFormat.BULLET,
							text: '•',
							alignment: AlignmentType.LEFT,
							style: {
								paragraph: {
									indent: { left: 360, hanging: 180 }
								}
							}
						}
					]
				}
			]
		},
		sections: [
			{
				properties: {
					page: {
						margin: { top: 720, right: 720, bottom: 720, left: 720 }
					}
				},
				children
			}
		]
	});
}

export async function writeResumeDocx(output: string, variant: ResumeVariant = 'ai') {
	const buffer = await Packer.toBuffer(buildResumeDocument(variant));
	await writeFile(output, buffer);
}
