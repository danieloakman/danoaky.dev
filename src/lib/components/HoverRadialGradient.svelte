<script lang="ts">
	const COLOR = 'color-mix(in srgb, var(--color-primary-500), transparent 85%)';
	const COLOR_2 = 'transparent 80%';
	const RADIUS = 600;
	let div: HTMLDivElement | null = null;
	function onMouseMove(e: MouseEvent) {
		const { clientX, clientY } = e;
		div?.style.setProperty(
			'background',
			`radial-gradient(${RADIUS}px at ${clientX}px ${clientY}px, ${COLOR}, ${COLOR_2})`
		);
	}
</script>

<svelte:body on:mousemove={onMouseMove} />

<div bind:this={div} class="pointer-events-none fixed inset-0 z-30 hidden md:block"></div>
