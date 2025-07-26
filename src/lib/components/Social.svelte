<script lang="ts" module>
	import { Github, Instagram, Linkedin } from '@lucide/svelte';

	export interface Props {
		class?: string;
		type: 'github' | 'linkedin' | 'instagram';
	}
	const MAP: Record<
		Props['type'],
		{ href: string; Icon: typeof Github | typeof Linkedin | typeof Instagram }
	> = {
		github: {
			href: 'https://github.com/danieloakman',
			Icon: Github
		},
		linkedin: {
			href: 'https://www.linkedin.com/in/daniel-brown-7676161a0/',
			Icon: Linkedin
		},
		instagram: {
			href: 'https://www.instagram.com/danoaky/',
			Icon: Instagram
		}
	};
</script>

<script lang="ts">
	const { class: klass = '', type }: Props = $props();

	const { href, Icon } = $derived(MAP[type]);
</script>

<a {href} target="_blank">
	<Icon
		class="w-8 h-8 hover:stroke-primary-500 hover:translate-y-[-4px] hover:animate-pulse transition-all duration-300 {klass}"
	/>
</a>
