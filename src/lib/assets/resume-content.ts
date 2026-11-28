import type { Experience, Project } from '../types';

import { EXPERIENCE, PROJECTS, SKILLS } from './content';

/**
 * Resume copy shared by the PDF page and the Word export.
 * Facts come from content.ts, git history and the Prima Careers review/meeting.
 * Anything still missing is a visible `TODO(daniel)` placeholder.
 */

/** `ai` leads with production AI work, `app` leads with web and mobile app work. */
export const RESUME_VARIANTS = ['ai', 'app'] as const;
export type ResumeVariant = (typeof RESUME_VARIANTS)[number];

export const parseVariant = (value: string | null | undefined): ResumeVariant =>
	RESUME_VARIANTS.find((v) => v === value) ?? 'ai';

export const TODO_PREFIX = 'TODO(daniel)';

type PerVariant<T> = Record<ResumeVariant, T>;
const both = <T>(value: T): PerVariant<T> => ({ ai: value, app: value });

interface Stint {
	/** Matches an EXPERIENCE entry for this company. */
	type: Experience['type'];
	/** Shown beside the roles, e.g. to flag a contract or concurrent work. */
	note?: string;
	bullets: PerVariant<string[]>;
}

interface ResumeJob {
	company: string;
	/** One line on what the company does, for non-technical readers. */
	about: PerVariant<string>;
	stints: Stint[];
}

export interface ResumeRole {
	title: string;
	start: Date;
	end?: Date;
	note?: string;
}

export interface ResumeJobView {
	company: string;
	url: string;
	location: string;
	about: string;
	/** Newest first, so multi-role progressions stay grouped under one company. */
	stints: { roles: ResumeRole[]; bullets: string[] }[];
}

const metric = (what: string) => `${TODO_PREFIX}: add a metric (${what}).`;

export const RESUME_JOBS: ResumeJob[] = [
	{
		company: 'Future Secure AI',
		about: both(
			`${TODO_PREFIX}: one sentence on what Future Secure AI does, for non-technical readers.`
		),
		stints: [
			{
				type: 'full-time',
				bullets: {
					ai: [
						'Engineered production LLM assistants and multi-agent workflows (LangChain, LangGraph, n8n, Flowise) to automate business tasks and processes.',
						'Built retrieval-augmented generation (RAG) pipelines with tool calling and agent planning, so models answer from grounded context and take reliable actions.',
						'Implemented guardrails and context management to keep model behaviour controllable in production.',
						'Integrated document AI (AWS Textract) into scalable, dependable pipelines.',
						'Spearheaded the move of legacy systems toward AI-enabled platforms and intelligent automation.',
						metric(
							'documents processed via Textract, retrieval accuracy gain, reliability gain from guardrails'
						)
					],
					app: [
						'Engineered LLM assistants and automated workflows (LangChain, LangGraph, n8n, Flowise) that take routine business tasks off people’s plates.',
						'Implemented guardrails and context management so AI features behave reliably in production.',
						'Spearheaded the move of legacy systems toward AI-enabled platforms.',
						metric('users or processes supported, time saved, reliability gain')
					]
				}
			}
		]
	},
	{
		company: 'FrogCo',
		about: both(
			'Sports video company behind FrogBox Play, a cricket highlights app, and PlayAI, a tool for personalised campaigns with AI-generated video.'
		),
		stints: [
			{
				type: 'full-time',
				bullets: {
					ai: [
						'Contributed to FrogBox Play, where AI cuts cricket clips from livestreams across the UK and Australia.',
						'Engineered PlayAI, a Next.js app for targeted email campaigns with LLM and AI-generated video content.',
						'Optimised video streaming for a large user base.',
						metric('concurrent users, latency or load-time gain, hours of video processed')
					],
					app: [
						'Engineered the FrogBox Play mobile app for iOS and Android with React Native and Reanimated gestures.',
						'Optimised video streaming for a large number of users and network requests.',
						'Delivered Next.js server-rendered web apps, including PlayAI, containerised with Docker; automated mobile builds and releases with mobile CI services.',
						metric('concurrent users, latency gain, deployment frequency')
					]
				}
			}
		]
	},
	{
		company: 'Tiny Technologies',
		about: both(
			'Maker of TinyMCE, a text editor that other companies build into their own products, with versions for React, Angular, Vue and Svelte.'
		),
		stints: [
			{
				type: 'full-time',
				bullets: both([
					'Maintained and improved a large, established TypeScript codebase, meeting client needs consistently.',
					'Updated the React, Angular, Vue and Svelte integrations for TinyMCE 7, the latest version at the time.',
					'Applied CI/CD and Playwright automated tests to protect reliability and quality.',
					'Led code reviews and mentored junior developers, lifting team performance and code health.',
					metric('customers or downloads supported, test coverage, release speed')
				])
			}
		]
	},
	{
		company: 'Auxilis',
		about: both(
			'Software startup specialising in Intelligent Document Processing. Its most successful service, Validate, helps financial auditors check financial statements.'
		),
		stints: [
			{
				type: 'contract',
				note: 'Contract, concurrent with Tiny Technologies and FrogCo',
				bullets: both([
					'Advised on strategic direction and roadmaps for existing projects.',
					'Guided design-pattern decisions to improve efficiency, readability and maintainability.',
					'Mentored engineers and aligned engineering with stakeholders.',
					`${TODO_PREFIX}: add one outcome from the consultancy; no details are recorded in the repo or meeting notes.`
				])
			},
			{
				type: 'full-time',
				bullets: {
					ai: [
						'Architected and operated production AI-driven document processing (OCR and data extraction) at scale, including the parser that still powers Validate.',
						'Led and mentored developers as Team Lead, working across Product, Engineering and Operations; teams ranged from two to ten people.',
						'Authored the company coding standards, required for SOC2 compliance, and maintained the shared core library used across Auxilis applications.',
						'Presented complex projects to executives, external stakeholders and remote teams in an Agile startup.',
						metric('documents processed, extraction accuracy, customers served')
					],
					app: [
						'Engineered web apps and scalable serverless backends and microservices in TypeScript, Node and Python.',
						'Led and mentored developers as Team Lead, working across Product, Engineering and Operations; teams ranged from two to ten people.',
						'Authored the company coding standards, required for SOC2 compliance, and maintained the shared core library used across Auxilis applications.',
						'Presented complex projects to executives, external stakeholders and remote teams in an Agile startup.',
						metric('users, delivery speed, systems shipped')
					]
				}
			}
		]
	},
	{
		company: 'University of Wollongong',
		about: both(
			'Tutoring for Indigenous university students through the Woolyungah Indigenous Centre, alongside my Auxilis role.'
		),
		stints: [
			{
				type: 'part-time',
				bullets: both([
					'Mentored students through a regular meeting schedule I set up with each of them.',
					'Adapted my teaching to suit each student’s abilities and needs.',
					'Communicated clearly and patiently, building trust with students.',
					`${TODO_PREFIX}: add an outcome (student results or feedback).`
				])
			}
		]
	}
];

export const jobsFor = (variant: ResumeVariant): ResumeJobView[] =>
	RESUME_JOBS.map((job) => {
		const entries = job.stints.map((stint) => {
			const experience = EXPERIENCE.find(
				({ company, type }) => company === job.company && type === stint.type
			);
			if (!experience) throw new Error(`No experience for ${job.company} (${stint.type})`);
			return { stint, experience };
		});
		const first = entries[0]!.experience;
		return {
			company: job.company,
			url: first.url,
			location: first.location,
			about: job.about[variant],
			stints: entries.map(({ stint, experience }) => ({
				roles: experience.roles.map((role, i) => ({
					...role,
					note: i === 0 ? stint.note : undefined
				})),
				bullets: stint.bullets[variant]
			}))
		};
	});

export const SUMMARY: PerVariant<string> = {
	ai: 'Senior Software Engineer and technical leader with 8+ years of experience, progressing from Trainee to Team Lead. Building production AI systems (LLM assistants, agentic workflows, RAG) on a base of mature web, mobile and distributed-systems engineering.',
	app: 'Senior Software Engineer and technical leader with 8+ years of experience, progressing from Trainee to Team Lead. Delivering fast, reliable web and mobile apps end to end, with growing depth in production AI.'
};

type SkillKey = keyof typeof SKILLS;

const SKILL_TIERS: PerVariant<{ title: string; skills: SkillKey[] }[]> = {
	ai: [
		{ title: 'Core Stack', skills: ['TS', 'python', 'node', 'react', 'nextJs', 'reactNative'] },
		{
			title: 'AI & Data',
			skills: ['AI', 'langChain', 'langGraph', 'n8n', 'flowise', 'awsTextract', 'ocr', 'postgresql']
		},
		{
			title: 'Cloud & Infrastructure',
			skills: ['aws', 'awsLambda', 'serverless', 'docker', 'ciCd', 'microservices']
		},
		{ title: 'Familiar', skills: ['golang', 'rust', 'angular', 'svelte', 'graphql'] }
	],
	app: [
		{
			title: 'Core Stack',
			skills: ['TS', 'react', 'reactNative', 'reactNativeReanimated', 'nextJs', 'node']
		},
		{
			title: 'AI & Data',
			skills: ['AI', 'langChain', 'langGraph', 'awsTextract', 'postgresql', 'prisma']
		},
		{
			title: 'Cloud & Infrastructure',
			skills: ['aws', 'serverless', 'docker', 'ciCd', 'playwright']
		},
		{ title: 'Familiar', skills: ['python', 'angular', 'svelte', 'capacitor', 'golang', 'rust'] }
	]
};

export const skillTiersFor = (variant: ResumeVariant) =>
	SKILL_TIERS[variant].map(({ title, skills }) => ({
		title,
		content: skills.map((key) => SKILLS[key].name).join(', ')
	}));

/** Soft-skill highlights, each backed by existing job, meeting and volunteering facts. */
export const ABOUT_ME: { title: string; content: string }[] = [
	{
		title: 'Team player and mentor',
		content:
			'Worked in teams of two to ten people, led developers as Team Lead, and mentored juniors at Tiny Technologies.'
	},
	{
		title: 'Clear communicator',
		content:
			'Presented complex projects to stakeholders and remote teams, and tutored university students.'
	},
	{
		title: 'Adaptable and growing',
		content: 'Progressed from Trainee to Team Lead, and worked across startup and remote teams.'
	},
	{
		title: 'Community-minded',
		content:
			'Active WIRES wildlife volunteer, including wildlife transport and wombat pre-release programs.'
	}
];

export interface ProjectCopy {
	/** Plain-language description for a general audience. */
	summary: string;
	/** Real-world usage, stars, downloads or problem solved. */
	impact: string;
}

const impactTodo = `${TODO_PREFIX}: add real-world usage, downloads or the problem it solved.`;

/** Coach feedback: favour projects with broad appeal over highly technical ones. */
const PROJECT_COPY: Record<string, ProjectCopy> = {
	'Extractly - Validate': {
		summary:
			'A tool that reads annual financial statements for auditors, pulls out the figures, checks them for consistency and delivers a report in a web app.',
		impact: impactTodo
	},
	'Polyphasic Sleep Manager': {
		summary:
			'An iOS app that helps people follow a polyphasic sleep schedule by finding nap slots in their phone calendar.',
		impact: impactTodo
	},
	'Lens of Brown Photography': {
		summary:
			'The website for my photography business, built from scratch. It scores 100 on Google Lighthouse.',
		impact: impactTodo
	},
	'FrogBox Play': {
		summary:
			'A mobile app for watching cricket highlights, with clips cut by AI from livestreams across the UK and Australia.',
		impact: impactTodo
	},
	'Update TinyMCE Integrations for v7': {
		summary:
			'Brought the React, Angular, Vue and Svelte versions of the TinyMCE text editor up to the latest release.',
		impact: impactTodo
	}
};

const PROJECT_NAMES: PerVariant<string[]> = {
	ai: [
		'Extractly - Validate',
		'Polyphasic Sleep Manager',
		'FrogBox Play',
		'Update TinyMCE Integrations for v7'
	],
	app: [
		'FrogBox Play',
		'Polyphasic Sleep Manager',
		'Update TinyMCE Integrations for v7',
		'Lens of Brown Photography'
	]
};

export type ProjectView = Pick<Project, 'name' | 'madeAt' | 'url'> & ProjectCopy;

export const projectsFor = (variant: ResumeVariant): ProjectView[] =>
	PROJECT_NAMES[variant].map((name) => {
		const project = PROJECTS.find((p) => p.name === name);
		const copy = PROJECT_COPY[name];
		if (!project || !copy) throw new Error(`Unknown project "${name}"`);
		return { name, madeAt: project.madeAt, url: project.url, ...copy };
	});

/** Follows the Prima Careers exit statement guide: context, normalisation, value, forward focus. */
export const EXIT_STATEMENT = `Following a company restructure at Future Secure AI that included widespread redundancies, my role was one of those affected. I valued the collaboration within the team and I am proud of the AI assistants and workflows we delivered together. I am now focused on senior software engineering roles where I can apply those skills at ${TODO_PREFIX}: name the target company and one specific project or goal that attracts you.`;

export const EDUCATION_TODO = `${TODO_PREFIX}: add AWS Partner accreditation details (what it covered, credential ID).`;
