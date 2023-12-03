import { getQuery } from 'h3';
import { IPaginationQueryParams } from '~/server/types/common';
import { handleError } from '~/server/utils/ErrorHandler';
import { getUsers } from '~/server/services/users';

export default defineEventHandler(async (event) => {
  try {
    const { page = 0, limit = 0 } = getQuery<IPaginationQueryParams>(event);
    const currentUserId = event.context?.auth?.user?.id as string;

    const users = await getUsers({
      currentUserId,
      page: +page,
      limit: +limit
    });

    return users;
  } catch (e) {
    return handleError(event, e);
  }
});
