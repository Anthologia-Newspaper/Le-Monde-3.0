import { servicesURL } from 'services';
import { EmptyType } from 'types/services';

const hardDelete = async (id: number) => servicesURL.delete<EmptyType>(`/articles/${id}`);

export default hardDelete;
