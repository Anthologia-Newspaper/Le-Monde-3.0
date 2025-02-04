import services from 'services';
import handle from 'utils/handler/handle';

export const oneUser = async (id: number) => handle(async () => await services.statistics.users.search.one(id));
