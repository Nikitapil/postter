import { getQuery } from 'h3';
import { handleError } from '~/server/utils/ErrorHandler';
import { getUsers } from '~/server/services/users';
import { IGetUsersQueries } from '~/server/types/users-types';

export default defineEventHandler(async (event) => {
  try {
    const {
      page = 0,
      limit = 0,
      search = ''
    } = getQuery<IGetUsersQueries>(event);
    const currentUserId = event.context?.auth?.user?.id as string;

    const users = await getUsers({
      currentUserId,
      page: +page,
      limit: +limit,
      search
    });

    return users;
  } catch (e) {
    return handleError(event, e);
  }
});
