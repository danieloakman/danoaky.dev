<script lang="ts" module>
	export const SECTIONS = ['ABOUT', 'EXPERIENCE', 'PROJECTS', 'EDUCATION'] as const;
</script>

<script lang="ts">
	import Education from '$lib/components/Education.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Section from '$lib/components/Section.svelte';
	import Header from '$lib/components/Header.svelte';
</script>

<!-- @deprecated TODO: remove eventually.-->
{#snippet loremIpsum(repeat: number)}
	<p>{'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'.repeat(repeat)}</p>
{/snippet}

<div
	class="flex flex-col md:flex-row mx-auto gap-4 xl:gap-10 min-h-screen max-w-screen-xl px-8 xl:px-4"
>
	<Header sections={SECTIONS} />

	<main class="flex flex-1 flex-col gap-30 py-10 xl:py-24">
		<Section title="About">
			{@render loremIpsum(20)}
		</Section>

		<Experience />

		<Projects />

		<Education />

		<section class="mt-10">
			<p class="opacity-70">
				&copy; {new Date().getFullYear()} Mimpup - Daniel Brown. All rights reserved.
			</p>
		</section>
	</main>
</div>
