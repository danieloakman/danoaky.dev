import { describe, expect, it } from 'vitest';

import {
	RESUME_VARIANTS,
	jobsFor,
	parseVariant,
	projectsFor,
	skillTiersFor
} from './resume-content';

describe('resume content', () => {
	it.each(RESUME_VARIANTS)('has copy for every job (%s)', (variant) => {
		for (const { about, stints } of jobsFor(variant)) {
			expect(about).not.toBe('');
			for (const { roles, bullets } of stints) {
				expect(roles.length).toBeGreaterThan(0);
				expect(bullets.length).toBeGreaterThan(0);
			}
		}
	});

	it('groups all Auxilis roles under one company, consultancy first', () => {
		const jobs = jobsFor('ai');
		const auxilis = jobs.filter(({ company }) => company === 'Auxilis');
		expect(auxilis).toHaveLength(1);
		const titles = auxilis[0]!.stints.flatMap(({ roles }) => roles.map(({ title }) => title));
		expect(titles).toEqual([
			'Consultant',
			'Team Lead',
			'Senior Software Engineer',
			'Software Engineer',
			'Trainee Software Engineer'
		]);
	});

	it.each(RESUME_VARIANTS)('resolves four projects and four skill tiers (%s)', (variant) => {
		expect(projectsFor(variant)).toHaveLength(4);
		expect(skillTiersFor(variant).map(({ title }) => title)).toEqual([
			'Core Stack',
			'AI & Data',
			'Cloud & Infrastructure',
			'Familiar'
		]);
	});

	it('defaults unknown variants to ai', () => {
		expect(parseVariant('app')).toBe('app');
		expect(parseVariant('nope')).toBe('ai');
		expect(parseVariant(null)).toBe('ai');
	});
});
