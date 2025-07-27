<script lang="ts" module>
	import { EXPERIENCE } from '$lib/assets/content';
	import { formatStartEndDates } from '$lib/utils/dates';

	import DescriptionCard from './DescriptionCard.svelte';
	import Link from './Link.svelte';
	import Section from './Section.svelte';
</script>

<Section title="Experience">
	{#each EXPERIENCE as experience}
		{@const roles = experience.roles.slice()}
		{@const lastRole = roles.shift()}
		{@const { start, end } = formatStartEndDates(
			experience.roles.at(-1)?.start ?? new Date(),
			lastRole?.end,
			'short'
		)}

		<DescriptionCard
			title={`${lastRole?.title} - ${experience.company}`}
			subtitles={roles.map((role) => role.title)}
			description={experience.summary ?? experience.description.join('\n')}
			{start}
			{end}
			href={experience.url}
			badges={experience.skills?.map((skill) => skill.name)}
		>
			{#snippet extra()}
				{#if experience.links}
					<div class="flex flex-wrap gap-2">
						{#each experience.links as link}
							<Link href={link.url} target="_blank" intent="attachment">{link.title}</Link>
						{/each}
					</div>
				{/if}
			{/snippet}
		</DescriptionCard>
	{/each}
</Section>
