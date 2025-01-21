import { OnlineUserContextType } from 'contexts/onlineUser';
import { UIHandling } from 'types/handler';
import { ParamsArticlesUpdate } from 'types/services';

const update = async (
	params: ParamsArticlesUpdate,
	callback: (id: number) => void,
	onlineUser: OnlineUserContextType,
	handleToast: ({ res, settings, messages }: UIHandling) => void,
) => {
	try {
		const res = await onlineUser.methods.articles.update(params);
		handleToast({
			res,
			settings: {
				showIfSuccess: true,
				showIfNotSuccess: true,
				showIfAuthError: false,
			},
			messages: {
				200: { message: 'Article modifié.' },
			},
		});
		if (res.status === 'success') {
			callback(res.data!.id);
		}
	} catch (error) {
		console.error(error);
	}
};

export default update;
