<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export interface Props extends Omit<HTMLAttributes<HTMLElement>, 'id'> {
		title: string;
		bottom?: Snippet;
	}
</script>

<script lang="ts">
	let { children, title, bottom, class: klass = '', ...rest }: Props = $props();
</script>

<section id={title.toUpperCase()} class="flex flex-col gap-4 {klass}" {...rest}>
	<h2
		class="h2 sticky top-0 backdrop-blur-xl z-10 text-preset-gradient-one px-4 py-4 -mx-4 md:py-0 md:px-0 md:mx-0 md:top-auto md:static md:backdrop-blur-none"
	>
		{title}
	</h2>

	<div class="group/list flex flex-col gap-4">
		{@render children?.()}
	</div>

	{@render bottom?.()}
</section>
