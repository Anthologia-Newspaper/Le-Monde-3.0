import { Topic } from './topic';
import { OnlineUser } from './user';

export type Article = {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	draft: boolean;
	title: string;
	content: string;
	rawContent: string;
	// authorId: number;
	author: OnlineUser;
	viewCounter: number;
	likeCounter: number;
	// topicId: number;
	topic: Topic;
};

export type OfflineArticle = {
	cid: string;
	createdAt: Date;
	updatedAt: Date;
	title: string;
	author: string;
	topic: string;
	preview: string;
};
