<script lang="ts">
	import { EDUCATION, EXPERIENCE, PROJECTS, SKILLS } from '$lib/assets/content';
	import type { Experience, Skill } from '$lib/types';
	import { formatStartEndDates } from '$lib/utils/dates';

	const {
		'programming-language': languages,
		framework: frameworks,
		library: libraries,
		tool: tools,
		platform: platforms
	} = Object.values(SKILLS).reduce(
		(acc, skill) => {
			acc[skill.type] = [...(acc[skill.type] ?? []), skill];
			return acc;
		},
		{} as Record<Skill['type'], Skill[]>
	);

	const skillByYears = (a: Skill, b: Skill) => b.years - a.years;
</script>

{#snippet subSection({ title, content, href }: { title?: string; content: string; href?: string })}
	<div>
		{#if title}
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a {href}><b>{title}</b></a>
		{/if}
		<p class="leading-normal">{content}</p>
	</div>
{/snippet}

{#snippet experienceBlock(items: Experience[])}
	<div class="experience-grid">
		{#each items as { company, roles, description, url } (company + (roles[0]?.title ?? ''))}
			{@const rolesCopy = roles.slice()}
			{@const lastRole = rolesCopy.shift()}

			<div class="experience-cell flex flex-col gap-1 min-w-0">
				<div class="flex flex-col">
					{#if lastRole}
						{@const { start, end } = formatStartEndDates(lastRole.start, lastRole.end)}
						<h3 class="flex flex-wrap gap-x-1 items-end text-[13px]">
							{lastRole.title} -
							<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
							<a href={url}><b class="font-semibold">{company}</b></a>
							<span class="text-[12px] opacity-60">{start} - {end}</span>
						</h3>
					{/if}
					{#each rolesCopy as role (role.title)}
						{@const { start, end } = formatStartEndDates(role.start, role.end)}
						<h3 class="flex flex-wrap gap-x-2 items-end text-[13px]">
							{role.title}
							<span class="text-[12px] opacity-60">{start} - {end}</span>
						</h3>
					{/each}
				</div>

				<ul class="pl-4 flex flex-col list-disc text-[12px] leading-snug">
					{#each description as item (item)}
						<li>{item}</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
{/snippet}

<div class="resume">
	<section class="page col">
		<header class="flex flex-col gap-2">
			<a href="https://danoaky.dev" class="anchor"><h1>Daniel Brown</h1></a>
			<p class="text-[13px] leading-snug max-w-[55ch]">
				Experienced Senior Software Engineer with a passion for building performant, scalable
				digital experiences for the web and mobile.
			</p>
			<p class="contact">
				<a class="link" href="mailto:doakman94@gmail.com">doakman94@gmail.com</a>
				<span aria-hidden="true">·</span>
				<a class="link" href="tel:0411032732">0411032732</a>
				<span aria-hidden="true">·</span>
				<a class="link" href="https://danoaky.dev">danoaky.dev</a>
				<span aria-hidden="true">·</span>
				<a class="link" href="https://github.com/danieloakman">github.com/danieloakman</a>
				<span aria-hidden="true">·</span>
				<a class="link" href="https://www.linkedin.com/in/daniel-brown-7676161a0/">
					linkedin.com/in/daniel-brown-7676161a0/
				</a>
				<span aria-hidden="true">·</span>
				<a class="link" href="https://www.npmjs.com/~danoaky">npmjs.com/~danoaky</a>
				<span aria-hidden="true">·</span>
				<span>Wollongong, NSW</span>
				<span aria-hidden="true">·</span>
				<span>Australian Citizen</span>
			</p>
		</header>

		<div class="col gap-2">
			<h2><a href="https://danoaky.dev#EXPERIENCE">Experience</a></h2>
			{@render experienceBlock(EXPERIENCE)}
		</div>
	</section>

	<section class="page col page-2">
		<p class="page-label">Daniel Brown — page 2</p>

		<div class="col gap-2">
			<h2>Skills</h2>
			<div class="skills-grid">
				{@render subSection({
					title: 'Strongest languages',
					content: languages
						.slice(0, 4)
						.map(({ name, years }) => `${years} years in ${name}`)
						.join(', ')
				})}
				{@render subSection({
					title: 'Other Known Languages',
					content: languages
						.slice(4)
						.sort(skillByYears)
						.map(({ name }) => name)
						.join(', ')
				})}
				{@render subSection({
					title: 'Libraries & Frameworks',
					content: libraries
						.concat(frameworks)
						.sort(skillByYears)
						.filter(({ years }) => years > 2)
						.map(({ name }) => name)
						.join(', ')
				})}
				{@render subSection({
					title: 'Tools & Platforms',
					content: platforms
						.concat(tools)
						.sort(skillByYears)
						.filter(({ years }) => years > 2)
						.map(({ name }) => name)
						.join(', ')
				})}
			</div>
		</div>

		<div class="col gap-2">
			<h2>Education</h2>
			<div class="education-grid">
				{#each EDUCATION as { institution, award, end } (institution)}
					{@render subSection({
						title: institution,
						content: `${award}${end ? ` - ${end.getFullYear()}` : ''}`
					})}
				{/each}
			</div>
		</div>

		<div class="col gap-2">
			<h2><a href="https://danoaky.dev/projects">Selected Projects</a></h2>
			{#each PROJECTS.filter(({ selected }) => selected).slice(0, 4) as { name, madeAt, description, url } (name)}
				{@render subSection({
					title: `${name}${madeAt === 'Personal' ? '' : ` - ${madeAt}`}`,
					content: description,
					href: url
				})}
			{/each}
			<a class="link text-[12px]" href="https://danoaky.dev/projects">View all my projects</a>
		</div>

		<div class="col gap-2">
			<h2>Beyond work</h2>
			<div class="beyond-grid">
				<div>
					<b>Volunteering</b>
					<p class="leading-normal">
						Active WIRES volunteer, certified for Rescue and Immediate Care (native wildlife) and
						Identification and Treatment of wombat mange. Passionate about helping native wildlife,
						providing education to the community and assisting with wider population conservation
						projects.
					</p>
				</div>
				<div>
					<b>Interests</b>
					<p class="leading-normal">
						Outside of coding, I enjoy photography, playing video games, snowboarding, rock climbing
						and spending time with my wonderful wife and dog.
					</p>
				</div>
			</div>
		</div>

		<footer class="absolute bottom-1 right-1 text-[11px]">
			<a
				class="link"
				href="https://github.com/danieloakman/danoaky.dev?tab=readme-ov-file#generating-resume"
			>
				Generated on {new Date().toLocaleDateString('en-AU', { timeZone: 'Australia/Sydney' })}
			</a>
		</footer>
	</section>
</div>

<style lang="postcss">
	@reference '../../app.css';

	.resume {
		@apply flex flex-col bg-neutral-200;
	}

	.page {
		box-sizing: border-box;
		width: 210mm;
		height: 297mm;
		@apply relative mx-auto overflow-hidden bg-white p-8 text-[12px];
	}

	.col {
		@apply flex flex-col gap-3.5;
	}

	.page-2 {
		@apply gap-8;
	}

	.page-label {
		@apply text-primary-300/70 -mb-2 text-[11px] tracking-wide;
	}

	h1 {
		@apply text-primary-300 text-4xl leading-none font-semibold;
	}

	h2 {
		@apply text-primary-300 border-primary-300/70 border-b pb-0.5 text-lg font-semibold;
	}

	.link {
		@apply text-primary-600 underline;
	}

	.contact {
		@apply flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[12px] leading-snug;
	}

	.contact a {
		@apply text-primary-600 underline;
	}

	.contact span[aria-hidden='true'] {
		@apply text-neutral-400 select-none;
	}

	.skills-grid,
	.experience-grid,
	.beyond-grid {
		@apply grid grid-cols-2 gap-x-4 gap-y-3;
	}

	.experience-cell {
		@apply border-b border-neutral-300 pb-1.5;
	}

	.experience-cell:nth-child(even) {
		@apply border-primary-200 border-l pl-2.5;
	}

	.education-grid {
		@apply grid grid-cols-3 gap-x-4;
	}
</style>
