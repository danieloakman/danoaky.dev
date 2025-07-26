<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export interface Props extends HTMLAttributes<HTMLDivElement> {}
</script>

<script lang="ts">
	let { children, class: klass = '', ...props }: Props = $props();
</script>

<div class="badge preset-tonal-primary {klass}" {...props}>
	{@render children?.()}
</div>
