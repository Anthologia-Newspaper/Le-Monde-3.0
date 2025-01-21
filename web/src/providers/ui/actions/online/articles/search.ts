import { OnlineUserContextType } from 'contexts/onlineUser';
import { Article } from 'types/article';
import { UIHandling } from 'types/handler';
import { ParamsArticlesSearch } from 'types/services';

export const allPublications = async (
	params: ParamsArticlesSearch,
	callback: (articles: Article[]) => void,
	onlineUser: OnlineUserContextType,
	handleToast: ({ res, settings, messages }: UIHandling) => void,
) => {
	try {
		const res = await onlineUser.methods.articles.search.allPublications(params);
		handleToast({
			res,
			settings: {
				showIfSuccess: false,
				showIfNotSuccess: true,
				showIfAuthError: false,
			},
			messages: {
				200: { message: 'Publications filtrées.' },
			},
		});
		if (res.status === 'success') {
			callback(res.data!);
		}
	} catch (error) {
		console.error(error);
	}
};

export const myArticles = async (
	params: ParamsArticlesSearch,
	callback: (articles: Article[]) => void,
	onlineUser: OnlineUserContextType,
	handleToast: ({ res, settings, messages }: UIHandling) => void,
) => {
	try {
		const res = await onlineUser.methods.articles.search.myArticles(params);
		handleToast({
			res,
			settings: {
				showIfSuccess: false,
				showIfNotSuccess: true,
				showIfAuthError: false,
			},
			messages: {
				200: { message: 'Articles filtrés.' },
			},
		});
		if (res.status === 'success') {
			callback(res.data!);
		}
	} catch (error) {
		console.error(error);
	}
};

export const likedPublications = async (
	params: ParamsArticlesSearch,
	callback: (articles: Article[]) => void,
	onlineUser: OnlineUserContextType,
	handleToast: ({ res, settings, messages }: UIHandling) => void,
) => {
	try {
		const res = await onlineUser.methods.articles.search.likedPublications(params);
		handleToast({
			res,
			settings: {
				showIfSuccess: false,
				showIfNotSuccess: true,
				showIfAuthError: false,
			},
			messages: {
				200: { message: 'Publications filtrées.' },
			},
		});
		if (res.status === 'success') {
			callback(res.data!);
		}
	} catch (error) {
		console.error(error);
	}
};

export const oneDraft = async (
	id: number,
	callback: (article: Article) => void,
	onlineUser: OnlineUserContextType,
	handleToast: ({ res, settings, messages }: UIHandling) => void,
) => {
	try {
		const res = await onlineUser.methods.articles.search.oneDraft(id);
		handleToast({
			res,
			settings: {
				showIfSuccess: false,
				showIfNotSuccess: true,
				showIfAuthError: false,
			},
			messages: {
				200: { message: 'Brouillon trouvé.' },
			},
		});
		if (res.status === 'success') {
			callback(res.data!);
		}
	} catch (error) {
		console.error(error);
	}
};

export const onePublication = async (
	id: number,
	successCallback: (article: Article) => void,
	errorCallback: () => void,
	onlineUser: OnlineUserContextType,
	handleToast: ({ res, settings, messages }: UIHandling) => void,
) => {
	try {
		const res = await onlineUser.methods.articles.search.onePublication(id);
		handleToast({
			res,
			settings: {
				showIfSuccess: false,
				showIfNotSuccess: true,
				showIfAuthError: false,
			},
			messages: {
				200: { message: 'Article trouvé.', subMessage: '' },
				404: { message: 'Article introuvable.', subMessage: 'Veuillez en renseigner un autre.' },
			},
		});
		if (res.status === 'success') {
			successCallback(res.data!);
		} else if (res.status === 'error') {
			errorCallback();
		}
	} catch (error) {
		console.error(error);
	}
};
