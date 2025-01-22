import { OnlineUserContextType } from 'contexts/onlineUser';
import { UIHandling } from 'types/handler';
import { ParamsAuthSignIn, ParamsAuthSignUp } from 'types/services';

export const up = async (
	params: ParamsAuthSignUp,
	callback: () => void,
	onlineUser: OnlineUserContextType,
	handleToast: ({ res, settings, messages }: UIHandling) => void,
) => {
	try {
		const res = await onlineUser.methods.auth.sign.up(params);
		handleToast({
			res,
			settings: {
				showIfSuccess: true,
				showIfNotSuccess: true,
				showIfAuthError: false,
			},
			messages: {
				201: { message: 'Bienvenue ! Création de votre compte réussie.' },
			},
		});
		if (res.status === 'success') {
			callback();
		}
	} catch (error) {
		console.error(error);
	}
};

export const signIn = async (
	params: ParamsAuthSignIn,
	callback: () => void,
	onlineUser: OnlineUserContextType,
	handleToast: ({ res, settings, messages }: UIHandling) => void,
) => {
	try {
		const res = await onlineUser.methods.auth.sign.in(params);
		handleToast({
			res,
			settings: {
				showIfSuccess: true,
				showIfNotSuccess: true,
				showIfAuthError: false,
			},
			messages: {
				200: { message: 'Bonjour ! Connexion à votre compte réussie.' },
				400: { message: 'Paramètres invalides.' },
				404: { message: 'Paramètres invalides.' },
			},
		});
		if (res.status === 'success') {
			callback();
		}
	} catch (error) {
		console.error(error);
	}
};

export const out = async (
	callback: () => void,
	onlineUser: OnlineUserContextType,
	handleToast: ({ res, settings, messages }: UIHandling) => void,
) => {
	try {
		const res = await onlineUser.methods.auth.sign.out();
		handleToast({
			res,
			settings: {
				showIfSuccess: true,
				showIfNotSuccess: true,
				showIfAuthError: false,
			},
			messages: {
				200: { message: 'Au révoir ! Déconnexion réussie.' },
			},
		});
		if (res.status === 'success') {
			callback();
		}
	} catch (error) {
		console.error(error);
	}
};

export const again = async (
	callback: () => void,
	onlineUser: OnlineUserContextType,
	handleToast: ({ res, settings, messages }: UIHandling) => void,
) => {
	try {
		const res = await onlineUser.methods.auth.sign.again();
		handleToast({
			res,
			settings: {
				showIfSuccess: false,
				showIfNotSuccess: false,
				showIfAuthError: false,
			},
			messages: {
				200: { message: 'Connexion rafraîchie.' },
			},
		});
		if (res.status === 'success') {
			callback();
		}
	} catch (error) {
		console.error(error);
	}
};
