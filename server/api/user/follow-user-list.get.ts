import { handleError } from '~/server/utils/ErrorHandler';
import { getQuery } from 'h3';
import { getFollowUsersList } from '~/server/services/users';
import { IGetFollowUsersListQuery } from '~/server/types/users-types';

export default defineEventHandler(async (event) => {
  try {
    const currentUserId = event.context?.auth?.user?.id as string;
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
