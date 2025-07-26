<script lang="ts" module>
	import { EDUCATION } from '$lib/assets/content';

	import DescriptionCard from './DescriptionCard.svelte';
	import Section from './Section.svelte';

	export interface Props {}
</script>

<script lang="ts">
	let {}: Props = $props();
</script>

<Section title="Education">
	{#each EDUCATION as education}
		<DescriptionCard title={education.institution} description={education.award}>
			{#snippet extra()}
				<p class="opacity-70">
					{[education.start, education.end]
						.map((d) => d?.getFullYear().toString())
						.filter(Boolean)
						.join(' - ')}
				</p>
			{/snippet}
		</DescriptionCard>
	{/each}
</Section>
