<script lang="ts" module>
	import type { HTMLButtonAttributes } from 'svelte/elements';

	export type Props = HTMLButtonAttributes;
</script>

<script lang="ts">
	const { children, type = 'button', class: klass = '', ...props }: Props = $props();
</script>

<button class="btn {klass}" {type} {...props}>
	{@render children?.()}
</button>
