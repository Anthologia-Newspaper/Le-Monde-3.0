import me from './me';
import { one } from './search';
import { username, email, password } from './update';

const user = {
	me,
	update: {
		username,
		email,
		password,
	},
	search: {
		one,
	},
};

export default user;
