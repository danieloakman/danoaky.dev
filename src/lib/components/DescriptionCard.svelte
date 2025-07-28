<script lang="ts" module>
	import type { Snippet } from 'svelte';

	import { windowSize } from '$lib/state/index.svelte';

	import Badge from './Badge.svelte';
	import Card from './Card.svelte';
	import Link from './Link.svelte';

	export interface Props {
		title: string;
		subtitles?: string[];
		description: string;
		class?: string;
		start?: string;
		end?: string;
		image?: {
			/** The name of the image file in the assets/images folder. Must be a png for now. */
			src: string;
			alt: string;
		} | null;
		badges?: string[];
		href?: string;
		/** Place extra content after the description but before the badges. */
		extra?: Snippet;
	}
</script>

<script lang="ts">
	let {
		title,
		subtitles = [],
		description,
		start,
		end,
		image,
		badges,
		href,
		class: klass = '',
		extra
	}: Props = $props();

	const onClick = () => {
		if (href) {
			window.open(href, '_blank');
		}
	};
</script>

{#snippet imageSnippet(src: string, alt: string)}
	<!-- Could support other image types, but we'd need to add an extension prop and add if else branches on each extension type here. Otherwise it can't be statically analysed. -->
	{#await import(`../assets/images/${src}.png?w=160&fit=contain&format=webp`) then src}
		<img
			src={src.default}
			{alt}
			class="object-contain border-2 border-slate-500 group-hover:border-primary-500 transition-all duration-300 rounded-lg"
		/>
	{/await}
{/snippet}

<Card
	class="group hover:!opacity-100 group-hover/list:opacity-50 flex items-start flex-col md:flex-row md:gap-4 {klass}"
>
	{#if image}
		{@render imageSnippet(image.src, image.alt)}
	{:else if start && end && !image}
		<span class="opacity-70 mt-1 min-w-32">{start} - {end}</span>
	{/if}

	<div class="flex flex-col gap-4">
		<div class="flex flex-col">
			{#if (image || image === null) && start}
				<p class="opacity-70">{start}</p>
			{/if}

			{#if href}
				<Link
					{href}
					target="_blank"
					intent="external"
					class="text-surface-contrast-50-950 group-hover:anchor"
				>
					{title}
				</Link>
			{:else}
				<h3 class="group-hover:text-primary-500">{title}</h3>
			{/if}

			{#each subtitles as subtitle}
				<p class="opacity-70">{subtitle}</p>
			{/each}
		</div>

		<p class="opacity-70 text-sm">{description}</p>

		{@render extra?.()}

		{#if badges}
			<div class="flex flex-wrap gap-2">
				{#each badges as badge}
					<Badge>{badge}</Badge>
				{/each}
			</div>
		{/if}
	</div>
</Card>
