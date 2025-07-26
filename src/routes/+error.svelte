<script lang="ts">
	import { dev } from '$app/environment';
	import { page } from '$app/state';
	import Link from '$lib/components/Link.svelte';
</script>

<div class="flex flex-col gap-4 justify-center items-center min-h-screen">
	<h1 class="h1">{page.status} {page.error?.message ?? 'Unknown error'}</h1>
	<Link href="/" intent="internal" class="text-xl">Go Home</Link>

	{#if dev && page.error}
		<pre class="pre text-sm">{JSON.stringify(page.error, null, 2)}</pre>
	{/if}
</div>
