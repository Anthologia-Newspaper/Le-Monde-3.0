import anthologies from './anthologies';
import articles from './articles';
import auth from './auth';
import topics from './topics';
import user from './user';

// TODO: verify that all call have the right settings to show toast (and right messages / subMessages)
const online = {
	auth,
	user,
	articles,
	anthologies,
	topics,
};

export default online;
