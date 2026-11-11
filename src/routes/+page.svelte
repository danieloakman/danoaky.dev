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
				I'm a Senior Software Engineer focused on production AI systems: LLM assistants, agentic
				workflows, and RAG, alongside robust fullstack web and mobile applications. I design and
				ship scalable solutions from React Native mobile experiences to server-side rendered Next.js
				apps and microservices, with a focus on dependable AI behaviour, answers grounded in real
				data, and smooth integration across platforms.
			</p>
			<p>
				Throughout my career, I've contributed across startups and established companies. I've led
				teams, mentored junior developers, and provided strategic technical guidance with a focus on
				efficiency, maintainability, and user-centric design. My work spans intelligent document
				processing, video streaming optimization, containerization, and advanced backend
				architectures, as well as modern AI tooling like LangChain, LangGraph, and automation
				platforms.
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
