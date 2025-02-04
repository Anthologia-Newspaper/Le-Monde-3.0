import { servicesURL } from 'services';
import { Stats } from 'types/statistics';

export const oneArticle = async (id: number) => servicesURL.get<Stats>(`/statistics/articles/${id}`);
