<script lang="ts" module>
	import type { Component } from 'svelte';
	import { blur } from 'svelte/transition';

	import GithubIcon from './icons/Github.svelte';
	import LinkedinIcon from './icons/Linkedin.svelte';

	export interface Props {
		class?: string;
		type: 'github' | 'linkedin';
	}
	const MAP: Record<Props['type'], { href: string; Icon: Component<{ class?: string }> }> = {
		github: {
			href: 'https://github.com/danieloakman',
			Icon: GithubIcon
		},
		linkedin: {
			href: 'https://www.linkedin.com/in/daniel-brown-7676161a0/',
			Icon: LinkedinIcon
		}
	};
</script>

<script lang="ts">
	const { class: klass = '', type }: Props = $props();

	const { href, Icon } = $derived(MAP[type]);
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<a in:blur {href} target="_blank">
	<Icon
		class="w-8 h-8 hover:stroke-primary-500 hover:translate-y-[-4px] hover:animate-pulse transition-all duration-300 {klass}"
	/>
</a>
