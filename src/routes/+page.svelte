<script lang="ts" module>
	export const SECTIONS = ['ABOUT', 'EXPERIENCE', 'PROJECTS', 'EDUCATION'] as const;
</script>

<script lang="ts">
	import Education from '$lib/components/Education.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Header from '$lib/components/Header.svelte';
	import Link from '$lib/components/Link.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Section from '$lib/components/Section.svelte';
</script>

<div
	class="flex flex-col md:flex-row mx-auto gap-4 md:gap-10 min-h-screen max-w-screen-xl px-4 md:px-8"
>
	<Header sections={SECTIONS} />

	<main class="flex flex-1 flex-col gap-20 md:gap-30 py-4 md:py-8 mt-20 md:mt-0">
		<Section title="About">
			<p>
				I'm a Senior Software Engineer with a passion for building robust fullstack web and mobile
				applications that deliver real impact. My expertise lies in crafting scalable solutions,
				from developing engaging React Native mobile experiences to architecting server-side
				rendered Next.js web apps and microservices. I thrive on tackling complex challenges,
				optimizing performance for large user bases, and ensuring seamless integration across
				diverse platforms.
			</p>
			<p>
				Throughout my career, I've had the privilege of contributing to a wide range of
				environments, from dynamic startups to established corporations. I've led teams, mentored
				junior developers, and provided strategic technical guidance, always with an eye toward
				efficiency, maintainability, and user-centric design. You'll find my work touches on
				everything from video streaming optimization and AI-driven content generation to
				containerization and advanced backend architectures.
			</p>
			<p>
				Outside of coding, I enjoy photography, playing video games, snowboarding, rock climbing and
				spending time with my wonderful wife and dog.
			</p>

			<Link class="text-xl" href="./resume.pdf" intent="internal" target="_blank">View Resume</Link>
		</Section>

		<Experience />

		<Projects />

		<Education />

		<section class="mt-10">
			<p class="opacity-70">
				&copy; {new Date().getFullYear()} Daniel Brown. All rights reserved.
			</p>
		</section>
	</main>
</div>
