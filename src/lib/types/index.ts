export interface Skill {
	name: string;
	type: 'programming-language' | 'library' | 'framework' | 'tool' | 'platform' | 'other';
	/** Years of experience. */
	years: number;
}

export interface Experience {
	company: string;
	roles: {
		title: string;
		start: Date;
		end?: Date;
	}[];
	description: string[];
	summary?: string;
	type: 'full-time' | 'part-time' | 'contract' | 'freelance';
	location: string;
	url: string;
	skills?: Skill[];
	links?: {
		title: string;
		url: string;
	}[];
}

export interface Education {
	/** e.g. "University of Wollongong" */
	institution: string;
	/** e.g. "Bachelor of Science in Computer Science", "Certificate IV in Games Programming" */
	award: string;
	start?: Date;
	end?: Date;
}

export interface Project {
	name: string;
	description: string;
	/** This can either be the date completed or just the year it was worked on. */
	date: Date;
	/** Company made at or personal project. */
	madeAt: string;
	url?: string;
	/** e.g. Github, Gitlab, etc. */
	sourceUrl?: string;
	skills?: Skill[];
	/** Name of the png file in the assets/images folder. */
	image?: string | null;
	/** Whether the project is selected for the home page. */
	selected?: boolean;
}

// export interface Interest {
//   type: 'hobby' | 'sport' | 'other';
//   name: string;
//   description: string;
// }
