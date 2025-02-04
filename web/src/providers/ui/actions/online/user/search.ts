import { OnlineUserContextType } from 'contexts/onlineUser';
import { UIHandling } from 'types/handler';
import { OnlineUser } from 'types/user';

export const one = async (
	id: number,
	successCallback: (onlineUser: OnlineUser) => void,
	errorCallback: () => void,
	onlineUser: OnlineUserContextType,
	handleToast: ({ res, settings, messages }: UIHandling) => void,
) => {
	try {
		const res = await onlineUser.methods.user.search.one(id);
		handleToast({
			res,
			settings: {
				showIfSuccess: false,
				showIfNotSuccess: true,
				showIfAuthError: true,
			},
			messages: {
				200: { message: 'Profil récupéré.' },
				404: { message: 'Profil introuvable.' },
			},
		});
		if (res.status === 'success') {
			successCallback(res.data!);
		} else {
			errorCallback();
		}
	} catch (error) {
		console.error(error);
	}
};
