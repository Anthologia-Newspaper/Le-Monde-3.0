import services from 'services';
import handle from 'utils/handler/handle';

export const one = (id: number) => handle(async () => await services.user.search.one(id));
