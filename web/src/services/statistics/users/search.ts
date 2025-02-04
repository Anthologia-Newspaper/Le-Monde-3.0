import { servicesURL } from 'services';
import { Stats } from 'types/statistics';

export const oneUser = async (id: number) => servicesURL.get<Stats>(`/statistics/users/${id}`);
