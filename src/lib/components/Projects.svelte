<script lang="ts" module>
	import { PROJECTS } from '$lib/assets/content';
	import { domain } from '$lib/utils/url';

	import DescriptionCard from './DescriptionCard.svelte';
	import Link from './Link.svelte';
	import Section from './Section.svelte';
</script>

<Section title="Projects">
	{#each PROJECTS.filter((p) => p.selected) as project (project.name)}
		<DescriptionCard
			title={project.name}
			subtitles={project.madeAt && project.madeAt !== 'Personal' ? [project.madeAt] : undefined}
			description={project.description}
			start={project.date.getFullYear().toString()}
			image={project.image ? { src: project.image, alt: project.name } : null}
			href={project.url}
			badges={project.skills?.map((skill) => skill.name)}
		>
			{#snippet extra()}
				{#if project.sourceUrl}
					<Link href={project.sourceUrl} target="_blank" intent="attachment">
						{domain(project.sourceUrl)}
					</Link>
				{/if}
			{/snippet}
		</DescriptionCard>
	{/each}

	{#snippet bottom()}
		<Link class="text-xl" href="./projects" intent="internal">View Full Project Archive</Link>
	{/snippet}
</Section>
