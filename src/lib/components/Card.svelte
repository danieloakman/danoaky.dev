<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
	let { children, class: klass, ...props }: Props = $props();
</script>

<div
	class="card duration-300 border border-transparent card-hover md:hover:preset-outlined-primary-500 md:hover:border-t-primary-100 md:hover:border-b-primary-900 md:hover:drop-shadow-lg md:hover:bg-surface-100-900 py-4 md:p-4 flex gap-4 {klass}"
	{...props}
>
	{@render children?.()}
</div>
