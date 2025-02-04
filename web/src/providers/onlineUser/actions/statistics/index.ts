import { oneArticle } from './articles/search';
import { oneUser } from './users/search';

const statistics = {
	articles: {
		search: {
			one: oneArticle,
		},
	},
	users: {
		search: {
			one: oneUser,
		},
	},
};

export default statistics;
