<script lang="ts">
	import { EDUCATION, EXPERIENCE, PROJECTS, SKILLS } from '$lib/assets/content';
	import type { Skill } from '$lib/types';
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
			<a {href}><b>{title}</b></a>
		{/if}
		<p class="leading-tight">{content}</p>
	</div>
{/snippet}

<main class="row p-8 text-xxs h-screen">
	<section class="col flex-2">
		<a href="https://danoaky.dev" class="anchor"><h1>Daniel Brown</h1></a>

		<p>
			Experienced Senior Software Engineer with a passion for building performant, scalable digital
			experiences for the web and mobile.
		</p>

		<h2>Experience</h2>

		<div class="col">
			{#each EXPERIENCE as { company, roles, description, url }}
				{@const rolesCopy = roles.slice()}
				{@const lastRole = rolesCopy.shift()}

				<div class="flex flex-col gap-1">
					<div class="flex flex-col">
						{#if lastRole}
							{@const { start, end } = formatStartEndDates(lastRole.start, lastRole.end)}
							<h3 class="flex gap-2 items-end text-[11px]">
								{lastRole.title} - <a href={url}><b class="font-semibold">{company}</b></a>
								<p class="text-xxs opacity-60">{start} - {end}</p>
							</h3>
						{/if}
						{#each rolesCopy as role}
							{@const { start, end } = formatStartEndDates(role.start, role.end)}
							<h3 class="flex gap-2 items-end text-[11px]">
								{role.title}
								<p class="text-xxs opacity-60">{start} - {end}</p>
							</h3>
						{/each}
					</div>

					<ul class="pl-6 flex flex-col list-disc">
						{#each description as description}
							<li>{description}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</section>

	<section class="col flex-1 vr border-primary-500 ps-4">
		<ul class="flex flex-col gap-0.5">
			<li>
				<a href="mailto:doakman94@gmail.com">doakman94@gmail.com</a>
			</li>
			<li>
				<a href="tel:0411032732">0411032732</a>
			</li>
			<li>
				<a href="https://danoaky.dev">danoaky.dev (Portfolio Website)</a>
			</li>
			<li>
				<a href="https://github.com/danieloakman">github.com/danieloakman</a>
			</li>
			<li>
				<a href="https://www.linkedin.com/in/daniel-brown-7676161a0/">
					linkedin.com/in/daniel-brown
				</a>
			</li>
			<li>
				<a href="https://www.npmjs.com/~danoaky">npmjs.com/~danoaky</a>
			</li>

			<br />

			<li>Wollongong, NSW</li>
			<li>Working rights: Australian Citizen</li>
		</ul>

		<div class="flex flex-col gap-2">
			<h2>Skills</h2>

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
					.filter(({ years }) => years > 1)
					.map(({ name }) => name)
					.join(', ')
			})}

			{@render subSection({
				title: 'Tools & Platforms',
				content: platforms
					.concat(tools)
					.sort(skillByYears)
					.filter(({ years }) => years > 1)
					.map(({ name }) => name)
					.join(', ')
			})}
		</div>

		<div class="flex flex-col gap-2">
			<h2>Selected Projects</h2>

			{#each PROJECTS.filter(({ selected }) => selected).slice(0, 4) as { name, madeAt, description, url }}
				{@render subSection({
					title: `${name}${madeAt === 'Personal' ? '' : ` - ${madeAt}`}`,
					content: description,
					href: url
				})}
			{/each}
		</div>

		<div class="flex flex-col gap-2">
			<h2>Education</h2>

			{#each EDUCATION as { institution, award, end }}
				{@render subSection({
					title: institution,
					content: `${award}${end ? ` - ${end.getFullYear()}` : ''}`
				})}
			{/each}
		</div>
	</section>
</main>

<style lang="postcss">
	@reference '../../app.css';

	.col {
		@apply flex flex-col gap-4;
	}

	.row {
		@apply flex flex-row gap-4;
	}

	.text-xxs {
		@apply text-xs text-[10px];
	}

	h1 {
		@apply text-primary-700 text-3xl font-semibold;
	}

	h2 {
		@apply text-primary-700 text-lg font-semibold;
	}

	li > a {
		@apply text-primary-800 underline;
	}
</style>
