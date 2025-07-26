<script lang="ts">
	import '../app.css';

	import HoverRadialGradient from '$lib/components/HoverRadialGradient.svelte';

	let { children } = $props();
</script>

<HoverRadialGradient />
{@render children()}

<svelte:head>
	<title>Daniel Brown</title>
	<meta name="description" content="Daniel Brown's portfolio website." />
</svelte:head>
