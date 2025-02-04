import { OnlineUserContextType } from 'contexts/onlineUser';
import { Stats } from 'types/statistics';
import { UIHandling } from 'types/handler';

export const oneUser = async (
	id: number,
	callback: (ArticleStatistics: Stats) => void,
	onlineUser: OnlineUserContextType,
	handleToast: ({ res, settings, messages }: UIHandling) => void,
) => {
	try {
		const res = await onlineUser.methods.statistics.users.search.one(id);
		handleToast({
			res,
			settings: {
				showIfSuccess: false,
				showIfNotSuccess: true,
				showIfAuthError: false,
			},
			messages: {
				200: { message: 'Statistique trouvé.', subMessage: '' },
				404: { message: 'Statistique introuvable.', subMessage: '' },
			},
		});
		if (res.status === 'success') {
			callback(res.data!);
		}
	} catch (error) {
		console.error(error);
	}
};
