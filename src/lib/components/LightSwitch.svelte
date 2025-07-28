<script lang="ts" module>
	import { Moon, Sun } from '@lucide/svelte';
	import { fade, draw, blur,  } from 'svelte/transition';

	export interface Props {
		class?: string;
	}
</script>

<script lang="ts">
	const { class: klass = '' }: Props = $props();

	let isDark = $state(false);
	const Icon = $derived(isDark ? Moon : Sun);

	$effect(() => {
		const mode = localStorage.getItem('mode') || 'light';
		isDark = mode === 'dark';
	});

	const onclick = () => {
		const checked = !isDark;
		const mode = checked ? 'dark' : 'light';
		document.documentElement.setAttribute('data-mode', mode);
		localStorage.setItem('mode', mode);
		isDark = checked;
	};
</script>

<svelte:head>
	<script>
		const mode = localStorage.getItem('mode') || 'light';
		document.documentElement.setAttribute('data-mode', mode);
	</script>
</svelte:head>

{#key isDark}
	<div in:blur>
		<Icon role="button" {onclick} class="w-8 h-8 {klass}" />
	</div>
{/key}
