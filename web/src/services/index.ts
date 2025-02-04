import axios from 'axios';

import context from 'context';
import auth from './auth';
import user from './user';
import articles from './articles';
import anthologies from './anthologies';
import topics from './topics';
import statistics from './statistics';

const servicesURL = axios.create({
	withCredentials: true,
	baseURL: context.config.env.BACKEND_URL,
	timeout: 10000,
});

const services = {
	auth,
	user,
	articles,
	anthologies,
	topics,
	statistics,
};

export { servicesURL };
export default services;
