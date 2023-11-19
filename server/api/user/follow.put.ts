import { toggleFollowUser } from '~/server/services/users';
import { handleError } from '~/server/utils/ErrorHandler';

export default defineEventHandler(async (event) => {
  try {
    const followByUserId = event.context?.auth?.user?.id as string;
    const { followToUserId } = await readBody(event);
    const updatedUser = await toggleFollowUser({
      followByUserId,
      followToUserId
    });
    return updatedUser;
  } catch (e) {
    return handleError(event, e);
  }
});
