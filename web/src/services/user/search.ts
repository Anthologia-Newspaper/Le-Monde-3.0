import { servicesURL } from 'services';
import { OnlineUser } from 'types/user';

export const one = async (id: number) => servicesURL.get<OnlineUser>(`/user/${id}`);
