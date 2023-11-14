import { getQuery } from 'h3';
import { getProfile } from '~/server/services/users';
import { handleError } from '~/server/utils/ErrorHandler';

export default defineEventHandler(async (event) => {
  try {
    const { profileId } = getQuery(event);

    const { profile } = await getProfile({ profileId: profileId as string });

    return { profile };
  } catch (e) {
    return handleError(event, e);
  }
});
