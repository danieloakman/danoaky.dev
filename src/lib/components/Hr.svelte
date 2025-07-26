<!--
@component Horizontal Rule
@description Wrapper around the <hr> element.
-->
<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export type HrProps = HTMLAttributes<HTMLHRElement> & {
		variant?: 'solid' | 'dashed' | 'dotted' | 'double';
		/** The width of the rule/line. */
		width?: number | string;
	};
</script>

<script lang="ts">
	let { variant = 'solid', width = 1, class: klass, ...rest }: HrProps = $props();

	const widthIsNumber = $derived(!isNaN(Number(width)));
	const borderWidth = $derived(widthIsNumber ? width + 'px' : width);
</script>

<hr
	class="hr {klass}"
	style:border-top-width={borderWidth}
	style:border-style={variant}
	{...rest}
/>
