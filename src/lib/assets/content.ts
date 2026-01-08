import { pick } from 'moderndash';

import type { Education, Experience, Project, Skill } from '$lib/types';
import { calcYears } from '$lib/utils/dates';

export const SKILLS = {
	JS: {
		name: 'JavaScript (ES6+)',
		type: 'programming-language',
		years: calcYears('2018-')
	},
	TS: {
		name: 'TypeScript',
		type: 'programming-language',
		years: calcYears('2019-')
	},
	python: {
		name: 'Python',
		type: 'programming-language',
		years: calcYears('2021-')
	},
	golang: {
		name: 'Golang',
		type: 'programming-language',
		years: calcYears('2020,2024-')
	},
	java: {
		name: 'Java',
		type: 'programming-language',
		years: calcYears('2017-2019')
	},
	cpp: {
		name: 'C++',
		type: 'programming-language',
		years: calcYears('2016,2019')
	},
	rust: {
		name: 'Rust',
		type: 'programming-language',
		years: calcYears('2023')
	},
	nim: {
		name: 'Nim',
		type: 'programming-language',
		years: calcYears('2020')
	},
	lua: {
		name: 'Lua',
		type: 'programming-language',
		years: calcYears('2018,2020')
	},
	react: {
		name: 'React',
		type: 'library',
		years: calcYears('2020-')
	},
	nextJs: {
		name: 'Next.js',
		type: 'framework',
		years: calcYears('2024-')
	},
	reactNative: {
		name: 'React Native (Expo)',
		type: 'framework',
		years: calcYears('2018, 2022-')
	},
	reactNativeReanimated: {
		name: 'React Native Reanimated',
		type: 'library',
		years: calcYears('2024-')
	},
	tanstackQuery: {
		name: 'Tanstack Query',
		type: 'library',
		years: calcYears('2024-')
	},
	reactNativeSkia: {
		name: 'React Native Skia',
		type: 'library',
		years: calcYears('2025-')
	},
	chakraUi: {
		name: 'Chakra UI',
		type: 'library',
		years: calcYears('2025')
	},
	svelte: {
		name: 'Svelte',
		type: 'framework',
		years: calcYears('2023-')
	},
	svelteKit: {
		name: 'SvelteKit',
		type: 'framework',
		years: calcYears('2023-')
	},
	angular: {
		name: 'Angular',
		type: 'framework',
		years: calcYears('2018-2023')
	},
	vue: {
		name: 'Vue',
		type: 'framework',
		years: calcYears('2023-')
	},
	tailwind: {
		name: 'Tailwind CSS',
		type: 'library',
		years: calcYears('2023-')
	},
	express: {
		name: 'Express',
		type: 'framework',
		years: calcYears('2018-2020')
	},
	node: {
		name: 'Node.js',
		type: 'tool',
		years: calcYears('2018-')
	},
	bun: {
		name: 'Bun',
		type: 'tool',
		years: calcYears('2024-')
	},
	pnpm: {
		name: 'PNPM',
		type: 'tool',
		years: calcYears('2023-')
	},
	npmPublishing: {
		name: 'NPM publishing',
		type: 'tool',
		years: calcYears('2022-')
	},
	aws: {
		name: 'Amazon Web Services',
		type: 'platform',
		years: calcYears('2018-')
	},
	awsLambda: {
		name: 'AWS Lambda',
		type: 'platform',
		years: calcYears('2018-')
	},
	awsDynamoDB: {
		name: 'AWS DynamoDB',
		type: 'platform',
		years: calcYears('2018-')
	},
	awsS3: {
		name: 'AWS S3',
		type: 'platform',
		years: calcYears('2018-')
	},
	awsTextract: {
		name: 'AWS Textract',
		type: 'platform',
		years: calcYears('2019-2023')
	},
	serverless: {
		name: 'Serverless',
		type: 'platform',
		years: calcYears('2018-2023')
	},
	gcp: {
		name: 'Google Cloud Platform',
		type: 'platform',
		years: calcYears('2019-2020')
	},
	gcpVisionOCR: {
		name: 'Google Cloud Vision OCR',
		type: 'platform',
		years: calcYears('2018-2023')
	},
	azure: {
		name: 'Microsoft Azure',
		type: 'platform',
		years: calcYears('2019-2020')
	},
	vitest: {
		name: 'Vitest',
		type: 'library',
		years: calcYears('2023-')
	},
	jest: {
		name: 'Jest',
		type: 'library',
		years: calcYears('2020-2023')
	},
	mocha: {
		name: 'Mocha',
		type: 'library',
		years: calcYears('2018-2023')
	},
	playwright: {
		name: 'Playwright',
		type: 'library',
		years: calcYears('2020,2023-')
	},
	prisma: {
		name: 'Prisma',
		type: 'library',
		years: calcYears('2021-2023')
	},
	graphql: {
		name: 'GraphQL',
		type: 'library',
		years: calcYears('2021-2023')
	},
	fastify: {
		name: 'Fastify',
		type: 'framework',
		years: calcYears('2025-')
	},
	postgresql: {
		name: 'PostgreSQL',
		type: 'platform',
		years: calcYears('2018-2022,2024')
	},
	firebase: {
		name: 'Firebase',
		type: 'platform',
		years: calcYears('2018-2022')
	},
	pocketbase: {
		name: 'Pocketbase',
		type: 'library',
		years: calcYears('2023-')
	},
	linux: {
		name: 'Linux',
		type: 'tool',
		years: calcYears('2022-')
	},
	nix: {
		name: 'Nix',
		type: 'programming-language',
		years: calcYears('2023-')
	},
	nixos: {
		name: 'NixOS',
		type: 'tool',
		years: calcYears('2023-')
	},
	wsl: {
		name: 'Windows Subsystem for Linux (WSL)',
		type: 'tool',
		years: calcYears('2022-')
	},
	debian: {
		name: 'Debian',
		type: 'tool',
		years: calcYears('2022-')
	},
	docker: {
		name: 'Docker',
		type: 'tool',
		years: calcYears('2024-')
	},
	microservices: {
		name: 'Microservices',
		type: 'tool',
		years: calcYears('2018-2022,2024-')
	},
	// webSockets: {
	// 	name: 'WebSockets',
	// 	type: 'tool',
	// 	years: calcYears('2022-')
	// },
	ciCd: {
		name: 'CI/CD',
		type: 'tool',
		years: calcYears('2019-2023')
	},
	// git: {
	// 	name: 'Git',
	// 	type: 'tool',
	// 	years: calcYears('2017-')
	// },
	AI: {
		name: 'Artificial Intelligence (AI)',
		type: 'tool',
		years: calcYears('2022-')
	},
	tutoring: {
		name: 'Tutoring',
		type: 'other',
		years: calcYears('2021-2022')
	},
	ocr: {
		name: 'Optical Character Recognition (OCR)',
		type: 'tool',
		years: calcYears('2021-2023')
	},
	sst: {
		name: 'SST',
		type: 'framework',
		years: calcYears('2023-')
	},
	capacitor: {
		name: 'Capacitor (Ionic)',
		type: 'framework',
		years: calcYears('2023-')
	},
	n8n: {
		name: 'n8n',
		type: 'library',
		years: calcYears('2025-')
	},
	flowise: {
		name: 'Flowise',
		type: 'library',
		years: calcYears('2025-')
	}
} satisfies Record<string, Skill>;

const selectSkills = (...skills: (keyof typeof SKILLS)[]) => Object.values(pick(SKILLS, skills));

export const EXPERIENCE: Experience[] = [
	{
		company: 'Future Secure AI',
		roles: [
			{
				title: 'Senior Software Engineer',
				start: new Date('2025-09-01')
			}
		],
		type: 'full-time',
		description: [
			'Development of AI powered assistants to help automate tasks and processes.',
			'Utilise the latest AI models and tools with n8n and Flowise.',
			'Migration of large legacy codebases to take advantage of newer tools and platforms like n8n.'
		],
		summary:
			'Development of AI-powered assistants for task automation using modern AI models and tools (n8n, Flowise), and migration of legacy codebases to modern platforms.',
		location: 'Australia (remote)',
		skills: selectSkills('TS', 'AI', 'n8n', 'flowise', 'awsTextract', 'postgresql'),
		url: 'https://www.futuresecure.ai'
	},
	{
		company: 'FrogCo',
		roles: [
			{
				title: 'Senior Software Engineer',
				start: new Date('2024-08-01'),
				end: new Date('2025-07-12')
			}
		],
		type: 'full-time',
		description: [
			'Development of mobile apps using React Native.',
			'Integrating and optimising video streaming in mobile apps.',
			'Maintenance and deployment of mobile apps for iOS and Android.',
			'Developing with a large number of users and network requests in mind.',
			'Usage of mobile specialised continuous integration utilities and services.',
			'Mobile gestures and animations.',
			'Development of Server Side Rendered NextJS web apps.',
			'Containerisation of web app stacks using Docker and docker compose configurations.'
		],
		summary:
			'Senior role focused on mobile and web development using React Native and Next.js, with expertise in video streaming, performance optimization, and containerized deployments. Development of high-traffic mobile applications with complex video streaming requirements, ensuring optimal performance for large user bases. Implemented modern DevOps practices including Docker containerization and mobile-specific CI/CD pipelines to streamline deployment processes.',
		location: 'Australia (remote)',
		skills: selectSkills(
			'TS',
			'react',
			'nextJs',
			'node',
			'docker',
			'aws',
			'prisma',
			'reactNative',
			'reactNativeReanimated'
		),
		url: 'https://www.frogbox.live',
		links: [
			{
				title: 'FrogBox Play',
				url: 'https://www.frogbox.live/frogbox-play'
			},
			{
				title: 'PlayAI',
				url: 'https://www.playai.co'
			}
		]
	},
	{
		company: 'Tiny Technologies',
		roles: [
			{
				title: 'Senior Software Engineer',
				start: new Date('2023-08-01'),
				end: new Date('2024-08-01')
			}
		],
		type: 'full-time',
		description: [
			'Maintenance and improvement of an established and large code base.',
			'Extended application of Typescript and web developer based technology, to consistently meet client needs.',
			'Regular exposure to continuous integration tools and development techniques.',
			'Reviewed and trained team of junior developer performance and code.',
			'Implemented automated tests using Playwright to ensure application reliability and quality.'
		],
		summary:
			'Senior role focused on maintaining and enhancing a large-scale codebase using TypeScript and modern web technologies. Led code reviews and mentored junior developers while implementing continuous integration practices. Consistently delivered high-quality solutions that met client requirements through effective use of React, Node.js, and automated testing frameworks.',
		location: 'Australia (remote)',
		skills: selectSkills('TS', 'react', 'node', 'AI', 'mocha', 'playwright', 'pnpm'),
		url: 'https://www.tiny.cloud',
		links: [
			{
				title: 'TinyMCE Core',
				url: 'https://www.npmjs.com/package/tinymce'
			},
			{
				title: 'React',
				url: 'https://www.npmjs.com/package/@tinymce/tinymce-react'
			},
			{
				title: 'Angular',
				url: 'https://www.npmjs.com/package/@tinymce/tinymce-angular'
			},
			{
				title: 'Vue',
				url: 'https://www.npmjs.com/package/@tinymce/tinymce-vue'
			},
			{
				title: 'Svelte',
				url: 'https://www.npmjs.com/package/@tinymce/tinymce-svelte'
			}
		]
	},
	{
		company: 'Auxilis',
		roles: [
			{
				title: 'Consultant',
				start: new Date('2024-02-01'),
				end: new Date('2024-09-01')
			}
		],
		type: 'contract',
		description: [
			'Providing strategic direction and technical advice to support and guide existing project operations.',
			'Guiding design pattern decisions to optimise efficiency, readability and ease of maintenance.',
			'Continued high level application of Python, Typescript & Node, including mentorship of staff.'
		],
		location: 'Wollongong NSW (remote)',
		url: 'https://auxilis.com',
		skills: selectSkills(
			'TS',
			'angular',
			'react',
			'node',
			'python',
			'golang',
			'ciCd',
			'aws',
			'serverless'
		)
	},
	{
		company: 'University of Wollongong',
		roles: [
			{
				title: 'Tutor for ITAP',
				start: new Date('2020-03-01'),
				end: new Date('2022-06-01')
			}
		],
		type: 'part-time',
		description: [
			'Experience with teaching indigenous University students.',
			'Required to set up a meeting schedule with students.',
			'Required excellent communication skills.',
			'Required to differ teaching to suit different abilities and needs.'
		],
		location: 'Wollongong NSW',
		url: 'https://www.uow.edu.au/about/services/woolyungah-indigenous-centre/itas/',
		skills: selectSkills('tutoring', 'cpp', 'java', 'python')
	},
	{
		company: 'Auxilis',
		roles: [
			{
				title: 'Team Lead',
				start: new Date('2022-06-01'),
				end: new Date('2023-08-01')
			},
			{
				title: 'Senior Software Engineer',
				start: new Date('2020-03-01'),
				end: new Date('2022-06-01')
			},
			{
				title: 'Software Engineer',
				start: new Date('2019-06-01'),
				end: new Date('2020-03-01')
			},
			{
				title: 'Trainee Software Engineer',
				start: new Date('2018-06-01'),
				end: new Date('2019-06-01')
			}
		],
		type: 'full-time',
		description: [
			'Advanced use of Javascript, Typescript, Python & NodeJS to deliver web-apps and serverless backends.',
			'Experience working in a startup environment.',
			'Regular communication with internal executives and external stakeholders.',
			'Utilised Typescript & Node to deliver scalable backend architectures & microservices.',
			// 'Advanced knowledge of pricing and awareness of costs in an application that requires IDP.',
			'Experience in tutoring, mentoring and career development of other developers, clients and stakeholders.',
			'Engagement and experience with remote team members, experience presenting complex projects to stakeholders in a remote environment.',
			// 'Prompt delivery against internal and external timeframes, adaptive project management to exceed expectations.',
			'Utilised AI driven solutions to parse complex OCR from documents.',
			'Experience gained in Prisma backend and GraphQL.',
			'Implemented end-to-end tests using Playwright as well as web-scraping utilities.'
		],
		summary:
			'Progressive career growth from Trainee to Team Lead in Intelligent Document Processing, specializing in AI-driven OCR solutions, scalable microservices, and stakeholder management in a startup environment. Developed full-stack applications using TypeScript, Python, and Node.js, with expertise in building scalable backend architectures and microservices. Led remote teams, managed stakeholder relationships, and delivered AI-powered document processing solutions while mentoring developers and managing complex projects within tight timeframes.',
		location: 'Wollongong NSW',
		skills: selectSkills(
			'TS',
			'angular',
			'react',
			'aws',
			'node',
			'mocha',
			'playwright',
			'pnpm',
			'python',
			'golang'
		),
		url: 'https://auxilis.com'
	}
];

export const EDUCATION: Education[] = [
	{
		institution: 'University of Wollongong',
		award: 'Bachelor of Computer Science',
		start: new Date('2017-06-01'),
		end: new Date('2020-06-01')
	},
	{
		institution: 'AWS Technical and Certification',
		award: 'AWS Partner: Accreditation (Technical)',
		end: new Date('2019-01-31')
	},
	{
		institution: 'Open University',
		award: 'Understanding Autism',
		end: new Date('2024-05-31')
	}
];

export const PROJECTS: Project[] = [
	{
		name: 'Polyphasic Sleep Manager',
		description:
			'An iOS app written in React-Native to help manage a polyphasic sleep schedule with your own personal schedule. Integrates with your phone’s calendar to see where you can fit in naps during the day and how to best fit in your sleep schedule.',
		date: new Date('2025-04-01'),
		madeAt: 'Personal',
		skills: selectSkills('TS', 'reactNative', 'reactNativeReanimated', 'reactNativeSkia'),
		image: 'polyphasic-sleep-manager',
		url: 'https://apps.apple.com/au/app/polyphasic-sleep-schedules/id6743132833',
		selected: true
	},
	{
		name: 'PlayAI',
		madeAt: 'FrogCo',
		date: new Date('2025-03-01'),
		description:
			'A NextJS web app for creating, managing and distributing targeted email campaigns containing AI generated videos of sport celebrities and athletes.',
		image: 'playai',
		url: 'https://www.playai.co',
		skills: selectSkills(
			'TS',
			'nextJs',
			'node',
			'tanstackQuery',
			'chakraUi',
			'fastify',
			'docker',
			'aws'
		),
		selected: true
	},
	{
		name: 'FrogBox Play',
		madeAt: 'FrogCo',
		date: new Date('2024-09-01'),
		description:
			'A mobile app for watching cricket clips and highlights. Videos are collected from livestreams across the UK and Australia, then clips are extracted using AI.',
		image: 'frogbox-play',
		url: 'https://www.frogbox.live/frogbox-play',
		skills: selectSkills('TS', 'reactNative', 'reactNativeReanimated', 'tanstackQuery'),
		selected: true
	},
	{
		name: 'Lens of Brown Photography',
		description:
			"A website I wrote from scratch with Svelte-kit for my photography business. It's a static website hosted on Github pages, with a score of 100 on Google lighthouse.",
		date: new Date('2024-06-01'),
		madeAt: 'Personal',
		skills: selectSkills('svelte', 'svelteKit', 'tailwind', 'bun'),
		image: 'lens-of-brown',
		url: 'https://www.lensofbrown.com.au',
		sourceUrl: 'https://github.com/danieloakman/lens-of-brown',
		selected: true
	},
	{
		name: 'Update TinyMCE Integrations for v7',
		description:
			'Updated the TinyMCE integration repositories for React, Angular, Vue & Svelte to support the latest version of TinyMCE at the time (v7).',
		date: new Date('2023-12-01'),
		skills: selectSkills('TS', 'angular', 'react', 'vue', 'svelte', 'node', 'ciCd'),
		madeAt: 'Tiny Technologies',
		image: 'tinymce-react',
		url: 'https://www.tiny.cloud/docs/tinymce/7/installation/',
		selected: true
	},
	{
		name: 'NixOS Configuration & dotfiles',
		description:
			'My NixOS configuration and dotfiles repository. I use NixOS as my primary operating system. This repository contains configuration for my desktop and laptop(s) as well as general dotfiles that can be symlinked to other non-NixOS systems (e.g. Windows, Mac). Support for both Gnome and Hyprland window/desktop managers.',
		date: new Date('2023-10-03'),
		madeAt: 'Personal',
		skills: selectSkills('nix', 'nixos', 'linux'),
		image: 'nixos',
		url: 'https://nixos.org',
		sourceUrl: 'https://github.com/danieloakman/dotfiles',
		selected: true
	},
	{
		name: '(Get It) Together',
		madeAt: 'Personal',
		date: new Date('2023-07-01'),
		// TODO
		description:
			'A mobile app made with Svelte, Capacitor and PocketBase for managing family related events, tasks and more.',
		skills: selectSkills(
			'TS',
			'svelte',
			'svelteKit',
			'capacitor',
			'tailwind',
			'AI',
			'sst',
			'tanstackQuery',
			'pocketbase'
		),
		image: null
	},
	{
		name: 'Auxilis Coding Standards',
		description:
			'Coding Standards for Auxilis, along with security and other guides and good practices. Mostly centred around Typescript and web practices. This was required for SOC2 compliance for the company.',
		date: new Date('2023-01-01'),
		madeAt: 'Auxilis',
		skills: selectSkills('TS'),
		image: null,
		selected: true
	},
	{
		name: 'Document Parser UI (Development tool)',
		madeAt: 'Auxilis',
		date: new Date('2023-02-01'),
		description:
			'An in-house development tool made to help with the development of creating custom document parsers. Making new custom parsers for a new client is a time-consuming process, so this tool helped with scaffolding and the intiail development of new parsers, as well as creating entire simpler parsers.',
		skills: selectSkills(
			'TS',
			'angular',
			'node',
			'ocr',
			'aws',
			'awsLambda',
			'awsTextract',
			'golang'
		),
		image: null
	},
	{
		name: 'Iteragain',
		description:
			'An NPM library that adds chainable iterator utility functions for Javascript, shipped with types.',
		date: new Date('2022-06-01'),
		madeAt: 'Personal',
		skills: selectSkills('TS', 'node', 'pnpm', 'npmPublishing', 'ciCd'),
		image: 'iteragain',
		url: 'https://www.npmjs.com/package/iteragain',
		sourceUrl: 'https://github.com/danieloakman/iteragain',
		selected: true
	},
	{
		name: 'Python PDF-miner API',
		description:
			'A Python Flask API running on AWS Lambda that used PDF-miner to extract text from PDF files. As well as a Typescript SDK that extended an OCR interface we used for all our other OCR sources like AWS Textract. Had a caching layer using DynamoDB.',
		madeAt: 'Auxilis',
		date: new Date('2022-02-01'),
		skills: selectSkills('TS', 'node', 'python', 'ciCd', 'awsLambda', 'awsDynamoDB'),
		image: null
	},
	{
		name: 'Extractly - Validate',
		description:
			'A web app tool to help financial auditors validate documents. In particular Annual Financial Statements and reports. It was used to parse and extract all data from these documents, such as tables and figures. Perform checks on the data extracted to ensure it is correct and consistent. Then provide a report of the results in a web app to speed up the auditors process.',
		date: new Date('2021-05-01'),
		madeAt: 'Auxilis',
		image: 'extractly-validate',
		skills: selectSkills(
			'TS',
			'angular',
			'node',
			'ciCd',
			'ocr',
			'AI',
			'aws',
			'awsLambda',
			'awsTextract'
		),
		url: 'https://www.linkedin.com/company/extractly-ai/posts/?feedView=all',
		selected: true
	},
	{
		name: 'more-node-fs',
		description: 'A library that adds more utility functions centred around the file system.',
		date: new Date('2021-03-01'),
		madeAt: 'Personal',
		image: null,
		skills: selectSkills('TS', 'node', 'pnpm', 'npmPublishing', 'ciCd'),
		url: 'https://www.npmjs.com/package/more-node-fs',
		sourceUrl: 'https://github.com/danieloakman/more-node-fs'
	},
	{
		name: 'Core library for Auxilis',
		description:
			"The core library imported and used across many of Auxilis' applications and services. I was the core maintainer of this library.",
		date: new Date('2021-03-01'),
		madeAt: 'Auxilis',
		image: null,
		skills: selectSkills('TS', 'JS', 'node', 'pnpm', 'ciCd', 'aws')
	},
	{
		name: 'Computer Science Degree Project',
		description:
			'The capstone project for my degree in Bachelor of Computer Science that dealt with customer onboarding at Dealercell.',
		date: new Date('2020-06-01'),
		madeAt: 'University of Wollongong',
		image: null,
		skills: selectSkills('TS', 'angular'),
		url: 'https://www.linkedin.com/company/dealercell/?originalSubdomain=au'
	},
	{
		name: 'General Document Parser',
		description:
			"A complex parser utilising techniques used for collecting general/abstract information from any document using Intelligent Document Processing techniques (such as utilising Optical Character Recognition (OCR), amongst others). Continues to be used today for Auxilis' most successful service: Validate.",
		date: new Date('2019-07-01'),
		madeAt: 'Auxilis',
		image: null,
		skills: selectSkills(
			'TS',
			'node',
			'ocr',
			'aws',
			'awsLambda',
			'awsDynamoDB',
			'awsS3',
			'awsTextract'
		),
		url: 'https://www.linkedin.com/company/extractly-ai/posts/?feedView=all'
	},
	{
		name: 'PDFjs wrapper',
		description:
			"A wrapper library around Mozilla's PDF.js library for extracting positional text data from PDF files. This was used along with OCR to extract data from documents.",
		madeAt: 'Auxilis',
		date: new Date('2019-02-01'),
		image: null,
		skills: selectSkills('JS', 'node', 'ocr'),
		url: 'https://github.com/mozilla/pdf.js'
	},
	{
		name: 'EZswitch',
		description:
			"A “compare the market” for Electricity and Gas bills. Laid the foundations for the underlying architecture and parsing infrastructure for all of Auxilis' Intelligent Document Processing projects.",
		date: new Date('2018-06-01'),
		madeAt: 'Auxilis',
		image: 'ezswitch',
		skills: selectSkills('JS', 'angular', 'node', 'ocr', 'awsLambda', 'awsDynamoDB', 'awsS3'),
		url: 'https://www.linkedin.com/company/minumus',
		selected: true
	}
];
