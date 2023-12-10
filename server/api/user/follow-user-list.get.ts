import { handleError } from '~/server/utils/ErrorHandler';
import { getQuery } from 'h3';
import { getFollowUsersList } from '~/server/services/users';
import { IGetFollowUsersListQuery } from '~/server/types/users-types';
import { getUserIdFromContext } from '~/server/utils/context';

export default defineEventHandler(async (event) => {
  try {
    const currentUserId = getUserIdFromContext(event);
    const { profileId, filter, page, limit } =
      getQuery<IGetFollowUsersListQuery>(event);

    const users = await getFollowUsersList({
      currentUserId,
      profileId,
      filter,
      page: +(page || 0),
      limit: +(limit || 0)
    });

    return users;
  } catch (e) {
    return handleError(event, e);
  }
});
