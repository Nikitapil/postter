import { toggleFollowUser } from '~/server/services/users';
import { handleError } from '~/server/utils/ErrorHandler';
import { getUserIdFromContext } from '~/server/utils/context';

export default defineEventHandler(async (event) => {
  try {
    const followByUserId = getUserIdFromContext(event);
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
