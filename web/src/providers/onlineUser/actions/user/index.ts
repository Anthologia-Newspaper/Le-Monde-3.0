import me from './me';
import { one } from './search';
import { password, email, username } from './update';

const user = {
	me,
	update: {
		password,
		email,
		username,
	},
	search: {
		one,
	},
};

export default user;
