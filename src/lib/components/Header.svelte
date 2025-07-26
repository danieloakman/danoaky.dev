<script lang="ts" module>
	export interface Props<TSection extends string> {
		sections: readonly TSection[];
	}
</script>

<script lang="ts" generics="TSection extends string">
	import { browser } from '$app/environment';
	import { pushState } from '$app/navigation';
	import { page } from '$app/state';

	import Hr from './Hr.svelte';
	import Social from './Social.svelte';

	let { sections }: Props<TSection> = $props();

	const sectionElements = $derived(
		!browser
			? []
			: (sections
					.map((section) => document.getElementById(section))
					.filter(Boolean) as HTMLElement[])
	);
	let sectionInView = $state<TSection | undefined>(
		(page.url.hash.slice(1) as TSection) || sections[0]
	);
	const onWindowScroll = () => {
		const section = sectionElements
			.map((element) => {
				const rect = element.getBoundingClientRect();
				const viewportHeight = window.innerHeight;

				// Calculate how much of the element is visible in the viewport
				const visibleTop = Math.max(0, rect.top);
				const visibleBottom = Math.min(viewportHeight, rect.bottom);
				const visibleHeight = Math.max(0, visibleBottom - visibleTop);
				const percentageInView = visibleHeight / rect.height;

				return {
					element,
					percentageInView
				};
			})
			.sort((a, b) => b.percentageInView - a.percentageInView)[0]?.element.id;
		if (section) sectionInView = section as TSection;
	};
</script>

<svelte:window onscroll={onWindowScroll} />

<header class="flex flex-1 flex-col gap-4 max-h-screen py-10 xl:py-24 md:sticky md:top-0">
	<h1 class="h1 text-preset-gradient-one">Daniel Brown</h1>
	<h2 class="text-lg">Full Stack Software Engineer</h2>
	<p class="opacity-70">I build web applications and mobile apps.</p>

	<br />

	<nav class="hidden md:block">
		<ul class="flex flex-col gap-4">
			{#each sections as section}
				{@const href = `#${section}`}
				{@const isSelected = sectionInView === section}
				<li class="group flex flex-row items-center gap-4">
					<Hr
						width="2"
						class="transition-all duration-300 group-hover:w-20 group-hover:border-primary-500 {isSelected
							? 'w-20 border-primary-500 opacity-70'
							: 'w-10'}"
					/>
					<a
						{href}
						class="capitalize {isSelected ? 'anchor' : ''}"
						onclick={(e) => {
							e.preventDefault();
							document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
							pushState(href, {});
						}}
					>
						{section}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<br />

	<div class="flex gap-4 mt-auto">
		<Social type="github" />
		<Social type="linkedin" />
		<Social type="instagram" />
	</div>
</header>
