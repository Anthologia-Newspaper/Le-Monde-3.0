import services from 'services';
import handle from 'utils/handler/handle';

export const oneArticle = async (id: number) => handle(async () => await services.statistics.articles.search.one(id));
