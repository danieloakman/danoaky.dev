<script lang="ts">
	import { ArrowLeft, ChevronUp } from '@lucide/svelte';
	import { fly } from 'svelte/transition';

	import { PROJECTS } from '$lib/assets/content';
	import Badge from '$lib/components/Badge.svelte';
	import Link from '$lib/components/Link.svelte';
	import { formatMonthYear } from '$lib/utils/dates';
	import { domain } from '$lib/utils/url';

	let expanded = $state<number | undefined>();
</script>

<main
	class="flex flex-col justify-center gap-4 min-h-screen max-w-7xl p-4 transition-all duration-300 mx-auto"
>
	<a href="/" class="self-start flex gap-2 items-center anchor"><ArrowLeft />Daniel Brown</a>
	<h1 class="h2 font-bold self-start text-preset-gradient-one">All Projects</h1>

	<div class="table-wrap">
		<table class="table caption-bottom">
			<thead>
				<tr>
					<th class="w-[12%]">Date</th>
					<th class="w-[12%]">Project</th>
					<th class="w-[12%]">Made At</th>
					<th class="w-[52%]">Skills</th>
					<th class="w-[12%]">Links</th>
				</tr>
			</thead>

			<tbody class="[&>tr]:hover:preset-tonal-secondary">
				{#each PROJECTS as { name, date, madeAt, skills = [], url, sourceUrl, description }, idx}
					{@const isExpanded = expanded === idx}
					<tr class="cursor-pointer" onclick={() => (expanded = isExpanded ? undefined : idx)}>
						<td>{formatMonthYear(date)}</td>
						<td>{name}</td>
						<td>{madeAt}</td>
						<td>
							<div class="flex flex-wrap flex-2 gap-2">
								{#each skills as skill}
									<Badge>{skill.name}</Badge>
								{/each}
							</div>
						</td>
						<td>
							{#each [url, sourceUrl] as link}
								{#if link}
									<Link href={link} target="_blank">
										{domain(link)}
									</Link>
								{/if}
							{/each}
						</td>
					</tr>
					{#if isExpanded}
						<tr
							class="border-t-0"
							transition:fly={{ duration: 300, y: -20, opacity: 0 }}
							onclick={() => (expanded = undefined)}
						>
							<td colspan="5">
								<ChevronUp class="mx-auto" />
								<p class="text-sm">{description}</p>
							</td>
						</tr>
					{/if}
				{/each}
			</tbody>

			<caption class="pt-4">* Most projects done at work do not have a Source URL.</caption>
		</table>
	</div>
</main>
