<script lang="ts" module>
	import { EXPERIENCE } from '$lib/assets/content';
	import { formatStartEndDates } from '$lib/utils/dates';

	import DescriptionCard from './DescriptionCard.svelte';
	import Link from './Link.svelte';
	import Section from './Section.svelte';
</script>

<Section title="Experience">
	{#each EXPERIENCE as { summary, description, roles, company, url, skills, links } (description)}
		{@const lastRole = roles[0]}
		{@const firstRole = roles.at(-1)}
		{@const { start, end } = formatStartEndDates(
			firstRole?.start ?? new Date(),
			lastRole?.end,
			'short'
		)}

		<DescriptionCard
			title={`${lastRole?.title} - ${company}`}
			subtitles={roles.slice(1).map((role) => role.title)}
			description={summary ?? description.join('\n')}
			{start}
			{end}
			href={url}
			badges={skills?.map((skill) => skill.name)}
		>
			{#snippet extra()}
				{#if links}
					<div class="flex flex-wrap gap-2">
						{#each links as link (link.url)}
							<Link href={link.url} target="_blank" intent="attachment">{link.title}</Link>
						{/each}
					</div>
				{/if}
			{/snippet}
		</DescriptionCard>
	{/each}
</Section>
