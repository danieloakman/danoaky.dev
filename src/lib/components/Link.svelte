<script lang="ts" module>
	import { ArrowRight, ArrowUpRight, Paperclip } from '@lucide/svelte';
	import { type VariantProps, cva } from 'class-variance-authority';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	const linkClass = cva('group/link transition-all duration-300 flex items-center', {
		variants: {
			intent: {
				external: 'gap-2 anchor hover:text-primary-600',
				internal: 'gap-2 anchor hover:text-primary-600',
				attachment: 'gap-1 hover:anchor'
			}
		}
	});
	export interface Props extends HTMLAnchorAttributes, VariantProps<typeof linkClass> {}
</script>

<script lang="ts">
	const { children, class: klass = '', intent = 'external', ...props }: Props = $props();
</script>

<a class={linkClass({ class: klass, intent })} {...props}>
	{#if intent === 'attachment'}
		<Paperclip class="duration-300 group-hover/link:text-primary-500 w-4 h-4" />
	{/if}

	{@render children?.()}

	{#if intent === 'external'}
		<ArrowUpRight
			class="duration-300 group-hover/link:translate-y-[-4px] group-hover/link:translate-x-[4px]"
		/>
	{:else if intent === 'internal'}
		<ArrowRight class="duration-300 group-hover/link:translate-x-[8px]" />
	{/if}
</a>
