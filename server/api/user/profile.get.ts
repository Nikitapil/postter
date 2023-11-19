import { getQuery } from 'h3';
import { getProfile } from '~/server/services/users';
import { handleError } from '~/server/utils/ErrorHandler';

export default defineEventHandler(async (event) => {
  try {
    const { profileId } = getQuery(event);

    const currentUserId = event.context?.auth?.user?.id as string;

    const { profile } = await getProfile({
      profileId: profileId as string,
      currentUserId
    });

    return { profile };
  } catch (e) {
    return handleError(event, e);
  }
});
