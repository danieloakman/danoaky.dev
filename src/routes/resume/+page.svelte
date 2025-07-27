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

{#snippet subSection({ title, content }: { title?: string; content: string })}
	<div>
		{#if title}
			<b>{title}</b>
		{/if}
		<p class="leading-tight">{content}</p>
	</div>
{/snippet}

<main class="row p-10 text-surface-900 text-xxs">
	<section class="col flex-2">
		<h1>Daniel Brown</h1>

		<p>
			Experienced Senior Software Engineer with a focus on building fullstack for the web and
			mobile.
		</p>

		<h2>Experience</h2>

		<div class="col">
			{#each EXPERIENCE as { company, roles, description }}
				{@const rolesCopy = roles.slice()}
				{@const lastRole = rolesCopy.shift()}

				<div class="flex flex-col gap-1">
					<div class="flex flex-col">
						{#if lastRole}
							{@const { start, end } = formatStartEndDates(lastRole.start, lastRole.end)}
							<h3 class="flex gap-2 items-end text-[11px]">
								{lastRole.title} - <b class="font-semibold">{company}</b>
								<mark class="text-xxs opacity-50"> {start} - {end} </mark>
							</h3>
						{/if}
						{#each rolesCopy as role}
							{@const { start, end } = formatStartEndDates(role.start, role.end)}
							<h3 class="flex gap-2 items-end text-[11px]">
								{role.title}
								<mark class="text-xxs opacity-50"> {start} - {end} </mark>
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

	<section class="col flex-1">
		<ul class="flex flex-col gap-0.5 border-1 border-primary-500 p-4 card">
			<li>
				<a href="mailto:doakman94@gmail.com">doakman94@gmail.com</a>
			</li>
			<li>
				<a href="tel:0411032732">0411032732</a>
			</li>
			<li>
				<a href="https://danoaky.dev">Portfolio Website</a>
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

			{#each PROJECTS.filter(({ selected }) => selected).slice(0, 4) as { name: title, description: content }}
				{@render subSection({ title, content })}
			{/each}
		</div>

		<div class="flex flex-col gap-2">
			<h2>Education</h2>

			{#each EDUCATION.filter(ed => !ed.institution.includes('Open')) as { institution, award, end }}
				{@render subSection({ title: institution, content: `${award}${end ? ` - ${end.getFullYear()}` : ''}` })}
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
		@apply text-primary-950 text-3xl font-semibold;
	}

	h2 {
		@apply text-primary-950 text-lg font-semibold;
	}

	a {
		@apply text-primary-900 underline;
	}
</style>
