<script lang="ts">
	import { ArrowLeft } from '@lucide/svelte';

	import { PROJECTS } from '$lib/assets/content';
	import Badge from '$lib/components/Badge.svelte';
	import Link from '$lib/components/Link.svelte';
	import { formatMonthYear } from '$lib/utils/dates';
	import { domain } from '$lib/utils/url';
</script>

<div
	class="flex flex-col justify-center gap-4 min-h-screen max-w-screen-xl p-10 transition-all duration-300"
>
	<a href="/" class="self-start flex gap-2 items-center anchor"><ArrowLeft />Daniel Brown</a>
	<h1 class="h2 font-bold self-start text-preset-gradient-one">All Projects</h1>

	<div class="table-wrap">
		<table class="table caption-bottom">
			<thead>
				<tr>
					<th>Year</th>
					<th>Project</th>
					<th>Made At</th>
					<th>Skills</th>
					<th>Links</th>
				</tr>
			</thead>

			<tbody class="[&>tr]:hover:preset-tonal-secondary">
				{#each PROJECTS as { name, date, madeAt, skills = [], url, sourceUrl }}
					<tr>
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
							<div class="flex flex-col flex-1 gap-2">
								{#each [url, sourceUrl] as link}
									{#if link}
										<Link href={link} target="_blank">
											{domain(link)}
										</Link>
									{/if}
								{/each}
							</div>
						</td>
					</tr>
				{/each}
			</tbody>

			<caption class="pt-4">* Most projects done at work do not have a Source URL.</caption>
		</table>
	</div>
</div>
