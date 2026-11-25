import {
	AlignmentType,
	BorderStyle,
	Document,
	ExternalHyperlink,
	HeadingLevel,
	LevelFormat,
	Packer,
	Paragraph,
	TextRun,
	type IParagraphOptions
} from 'docx';
import { writeFile } from 'fs/promises';

import { EDUCATION, EXPERIENCE, PROJECTS, RESUME_META, SKILLS } from '../src/lib/assets/content';
import type { Experience, Skill } from '../src/lib/types';
import { formatStartEndDates } from '../src/lib/utils/dates';

const ACCENT = 'B45309';
const MUTED = '6B7280';

const skillByYears = (a: Skill, b: Skill) => b.years - a.years;

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

function skillGroups() {
	const {
		'programming-language': languages = [],
		framework: frameworks = [],
		library: libraries = [],
		tool: tools = [],
		platform: platforms = []
	} = Object.values(SKILLS).reduce(
		(acc, skill) => {
			acc[skill.type] = [...(acc[skill.type] ?? []), skill];
			return acc;
		},
		{} as Record<Skill['type'], Skill[]>
	);

	return [
		{
			title: 'Strongest languages',
			content: languages
				.slice(0, 4)
				.map(({ name, years }) => `${years} years in ${name}`)
				.join(', ')
		},
		{
			title: 'Other Known Languages',
			content: languages
				.slice(4)
				.sort(skillByYears)
				.map(({ name }) => name)
				.join(', ')
		},
		{
			title: 'Libraries & Frameworks',
			content: libraries
				.concat(frameworks)
				.sort(skillByYears)
				.filter(({ years }) => years > 2)
				.map(({ name }) => name)
				.join(', ')
		},
		{
			title: 'Tools & Platforms',
			content: platforms
				.concat(tools)
				.sort(skillByYears)
				.filter(({ years }) => years > 2)
				.map(({ name }) => name)
				.join(', ')
		}
	];
}

function experienceParagraphs(items: Experience[]) {
	const paragraphs: Paragraph[] = [];

	for (const { company, roles, description, url } of items) {
		const rolesCopy = roles.slice();
		const lastRole = rolesCopy.shift();

		if (lastRole) {
			const { start, end } = formatStartEndDates(lastRole.start, lastRole.end);
			paragraphs.push(
				bodyParagraph({
					spacing: { before: 120, after: 40 },
					children: [
						new TextRun({ text: `${lastRole.title} - `, bold: true, size: 22 }),
						linkRun(company, url),
						new TextRun({ text: `  ${start} - ${end}`, color: MUTED, size: 20 })
					]
				})
			);
		}

		for (const role of rolesCopy) {
			const { start, end } = formatStartEndDates(role.start, role.end);
			paragraphs.push(
				bodyParagraph({
					spacing: { after: 40 },
					children: [
						new TextRun({ text: role.title, bold: true, size: 22 }),
						new TextRun({ text: `  ${start} - ${end}`, color: MUTED, size: 20 })
					]
				})
			);
		}

		for (const item of description) {
			paragraphs.push(bullet(item));
		}
	}

	return paragraphs;
}

export function buildResumeDocument() {
	const generatedOn = new Date().toLocaleDateString('en-AU', { timeZone: 'Australia/Sydney' });
	const selectedProjects = PROJECTS.filter(({ selected }) => selected).slice(0, 4);

	const contactChildren = [
		linkRun(RESUME_META.email, `mailto:${RESUME_META.email}`),
		new TextRun({ text: ' · ', color: MUTED, size: 20 }),
		linkRun(RESUME_META.phone, RESUME_META.phoneHref)
	];

	for (const { label, url } of RESUME_META.links) {
		contactChildren.push(
			new TextRun({ text: ' · ', color: MUTED, size: 20 }),
			linkRun(label, url)
		);
	}

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
			children: [new TextRun({ text: RESUME_META.summary, size: 22 })]
		}),
		bodyParagraph({
			spacing: { after: 160 },
			children: contactChildren
		}),
		heading('Experience'),
		...experienceParagraphs(EXPERIENCE),
		heading('Skills'),
		...skillGroups().flatMap(({ title, content }) => [
			bodyParagraph({
				spacing: { before: 80, after: 20 },
				children: [new TextRun({ text: title, bold: true, size: 20 })]
			}),
			bodyParagraph({
				children: [new TextRun({ text: content, size: 20 })]
			})
		]),
		heading('Education'),
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
		heading('Selected Projects'),
		...selectedProjects.flatMap(({ name, madeAt, description, url }) => {
			const title = `${name}${madeAt === 'Personal' ? '' : ` - ${madeAt}`}`;
			return [
				bodyParagraph({
					spacing: { before: 80, after: 20 },
					children: url
						? [linkRun(title, url)]
						: [new TextRun({ text: title, bold: true, size: 20 })]
				}),
				bodyParagraph({
					children: [new TextRun({ text: description, size: 20 })]
				})
			];
		}),
		bodyParagraph({
			spacing: { before: 60, after: 80 },
			children: [linkRun('View all my projects', 'https://danoaky.dev/projects')]
		}),
		heading('Beyond work', { pageBreakBefore: true }),
		bodyParagraph({
			spacing: { before: 80, after: 20 },
			children: [new TextRun({ text: 'Volunteering', bold: true, size: 20 })]
		}),
		bodyParagraph({
			children: [new TextRun({ text: RESUME_META.volunteering, size: 20 })]
		}),
		bodyParagraph({
			spacing: { before: 80, after: 20 },
			children: [new TextRun({ text: 'Interests', bold: true, size: 20 })]
		}),
		bodyParagraph({
			children: [new TextRun({ text: RESUME_META.interests, size: 20 })]
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
		description: RESUME_META.summary,
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

export async function writeResumeDocx(output: string) {
	const buffer = await Packer.toBuffer(buildResumeDocument());
	await writeFile(output, buffer);
}
