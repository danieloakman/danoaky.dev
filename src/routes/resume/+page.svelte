<script lang="ts">
	import { EDUCATION, RESUME_META } from '$lib/assets/content';
	import {
		ABOUT_ME,
		EDUCATION_TODO,
		EXIT_STATEMENT,
		SUMMARY,
		jobsFor,
		projectsFor,
		skillTiersFor
	} from '$lib/assets/resume-content';
	import type { ResumeJobView } from '$lib/assets/resume-content';
	import { formatStartEndDates } from '$lib/utils/dates';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const variant = $derived(data.variant);
	const jobs = $derived(jobsFor(variant));
	const projects = $derived(projectsFor(variant));

	/** Jobs rendered on page 1, the rest flow onto page 2. */
	const PAGE_1_JOBS = 2;
</script>

{#snippet subSection({ title, content, href }: { title?: string; content: string; href?: string })}
	<div>
		{#if title && href}
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a class="link" {href}><b>{title}</b></a>
		{:else if title}
			<b>{title}</b>
		{/if}
		<p class="leading-normal">{content}</p>
	</div>
{/snippet}

{#snippet job({ company, url, location, about, stints }: ResumeJobView)}
	<div class="job flex min-w-0 flex-col gap-1">
		<h3 class="flex flex-wrap items-baseline gap-x-2 text-[13px]">
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a href={url}><b class="font-semibold">{company}</b></a>
			<span class="text-[11px] opacity-60">{location}</span>
		</h3>
		<p class="leading-snug italic opacity-80">{about}</p>
		{#each stints as { roles, bullets } (roles[0]?.title)}
			<div class="flex flex-col">
				{#each roles as { title, start, end, note } (title)}
					{@const dates = formatStartEndDates(start, end)}
					<div class="role">
						<span class="font-semibold">{title}{note ? ` (${note})` : ''}</span>
						<span class="text-[11px] whitespace-nowrap opacity-60">{dates.start} - {dates.end}</span
						>
					</div>
				{/each}
			</div>
			<ul class="list-disc pl-4 leading-snug">
				{#each bullets as item (item)}
					<li>{item}</li>
				{/each}
			</ul>
		{/each}
	</div>
{/snippet}

<div class="resume" data-variant={variant}>
	<section class="page col">
		<p class="page-label">{RESUME_META.name} - page 1</p>

		<header class="col gap-2">
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a href={RESUME_META.siteUrl} class="anchor"><h1>{RESUME_META.name}</h1></a>
			<p class="leading-snug">{SUMMARY[variant]}</p>
			<p class="contact">
				<a href="mailto:{RESUME_META.email}">{RESUME_META.email}</a>
				<span aria-hidden="true">·</span>
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a href={RESUME_META.phoneHref}>{RESUME_META.phone}</a>
				<span aria-hidden="true">·</span>
				<span>{RESUME_META.location}</span>
				<span aria-hidden="true">·</span>
				<span>{RESUME_META.citizenship}</span>
			</p>
		</header>

		<div class="col gap-2">
			<h2>Skills</h2>
			{#each skillTiersFor(variant) as { title, content } (title)}
				{@render subSection({ title, content })}
			{/each}
		</div>

		<div class="col gap-2">
			<h2><a href="https://danoaky.dev#EXPERIENCE">Experience</a></h2>
			{#each jobs.slice(0, PAGE_1_JOBS) as view (view.company)}
				{@render job(view)}
			{/each}
		</div>
	</section>

	<section class="page col">
		<p class="page-label">{RESUME_META.name} - page 2</p>

		<div class="col gap-2">
			{#each jobs.slice(PAGE_1_JOBS) as view (view.company)}
				{@render job(view)}
			{/each}
		</div>
	</section>

	<section class="page col">
		<p class="page-label">{RESUME_META.name} - page 3</p>

		<div class="col gap-2">
			<h2>Selected Projects</h2>
			<p class="contact">
				{#each RESUME_META.links as { label, url }, i (url)}
					{#if i > 0}<span aria-hidden="true">·</span>{/if}
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
					<a class="link" href={url}>{label}</a>
				{/each}
			</p>
			{#each projects as { name, madeAt, summary, impact, url } (name)}
				{@render subSection({
					title: `${name}${madeAt === 'Personal' ? '' : ` - ${madeAt}`}`,
					content: `${summary} ${impact}`,
					href: url
				})}
			{/each}
			<a class="link text-[12px]" href="https://danoaky.dev/projects">View all my projects</a>
		</div>

		<div class="col gap-2">
			<h2>Education & Professional Development</h2>
			{#each EDUCATION as { institution, award, end } (institution)}
				{@render subSection({
					title: institution,
					content: `${award}${end ? ` - ${end.getFullYear()}` : ''}`
				})}
			{/each}
			<p class="leading-normal">
				{EDUCATION_TODO}
			</p>
		</div>

		<div class="col gap-2">
			<h2>Working with people</h2>
			{#each ABOUT_ME as { title, content } (title)}
				{@render subSection({ title, content })}
			{/each}
		</div>

		<div class="col gap-2">
			<h2>Next step</h2>
			<p class="leading-normal">{EXIT_STATEMENT}</p>
		</div>

		<footer class="absolute right-1 bottom-1 text-[11px]">
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

	.page-label {
		@apply text-primary-300/70 -mb-2 text-[11px] tracking-wide;
	}

	h1 {
		@apply text-primary-300 text-4xl leading-none font-semibold;
	}

	h2 {
		@apply text-primary-300 border-primary-300/70 border-b pb-0.5 text-lg font-semibold;
	}

	/* Gold like section headers, underline so they still read as links */
	a,
	a.link {
		color: var(--color-primary-300);
		text-decoration: underline solid color-mix(in oklab, var(--color-primary-300) 75%, transparent);
		text-decoration-thickness: 1.5px;
		text-underline-offset: 2px;
	}

	a.anchor {
		text-decoration: none;
	}

	a.anchor h1 {
		text-decoration: underline solid color-mix(in oklab, var(--color-primary-300) 55%, transparent);
		text-decoration-thickness: 1.5px;
		text-underline-offset: 4px;
	}

	.contact {
		@apply flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[12px] leading-snug;
	}

	.contact span[aria-hidden='true'] {
		@apply text-neutral-400 select-none;
	}

	.job {
		@apply border-b border-neutral-300 pb-2;
	}

	.role {
		@apply flex items-baseline justify-between gap-x-3;
	}
</style>
