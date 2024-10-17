import { Article } from './article';

export type Anthology = {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	userId: number;
	name: string;
	description: string;
	isPublic: boolean;
	articleCount: number;
	articles: Article[];
};

export type OfflineAnthology = {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	name: string;
	description: string;
	articles: string[];
};
