import { toggleFollowUser } from '~/server/services/users';
import { handleError } from '~/server/utils/ErrorHandler';

export default defineEventHandler(async (event) => {
  try {
    const followByUserId = event.context?.auth?.user?.id as string;
    const { followToUserId } = await readBody(event);
    const response = await toggleFollowUser({
      followByUserId,
      followToUserId
    });
    return response;
  } catch (e) {
    return handleError(event, e);
  }
});
