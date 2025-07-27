import { length, range } from 'iteragain';

const TODAY = new Date();

const numOfYearsFrom = (start: string, stop: string) =>
	length(range(parseInt(start), parseInt(stop) + 1)); // +1 because range is exclusive

/** @param str - Format of 'YYYY-YYYY,YYYY,YYYY-' */
export const calcYears = (str: string) => {
	let total = 0;
	const parts = str.split(',');
	for (const part of parts) {
		if (part.includes('-')) {
			const [start, end] = part.split('-');
			if (start && end) total += numOfYearsFrom(start, end);
			else if (start) total += numOfYearsFrom(start, TODAY.getFullYear().toString());
		} else if (part) total++;
	}
	return total;
};

export function formatMonthYear(date: Date) {
	return date.toLocaleString('en-AU', { month: 'short', year: 'numeric' });
}

export function formatStartEndDates(start: Date, end?: Date, format: 'long' | 'short' = 'long') {
	const [startMonth, startYear] = formatMonthYear(start).split(' ');
	const [endMonth, endYear] = end ? formatMonthYear(end).split(' ') : [];

	if (format === 'short') {
		return startYear === endYear
			? { start: startMonth, end: end ? `${endMonth} ${endYear}` : 'Present' }
			: { start: startYear, end: endYear ?? 'Present' };
	}

	const endStr = end ? `${endMonth} ${endYear}` : 'Present';
	return startYear === endYear
		? { start: startMonth, end: endStr }
		: { start: `${startMonth} ${startYear}`, end: endStr };
}
