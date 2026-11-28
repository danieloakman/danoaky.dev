<script lang="ts">
	import '../app.css';

	import { dev } from '$app/environment';
	import * as publicEnv from '$env/static/public';
	import HoverRadialGradient from '$lib/components/HoverRadialGradient.svelte';

	let { children } = $props();

	// Namespace import: a missing PUBLIC_CF_BEACON_TOKEN is undefined instead of a build error.
	const beaconToken = (publicEnv as Record<string, string | undefined>).PUBLIC_CF_BEACON_TOKEN;
</script>

<HoverRadialGradient />
{@render children()}

<svelte:head>
	<title>Daniel Brown</title>
	<meta name="description" content="Daniel Brown's portfolio website." />
	{#if !dev && beaconToken}
		<script
			defer
			src="https://static.cloudflareinsights.com/beacon.min.js"
			data-cf-beacon={JSON.stringify({ token: beaconToken })}
		></script>
	{/if}
</svelte:head>
