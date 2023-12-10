import { getQuery } from 'h3';
import { getProfile } from '~/server/services/users';
import { handleError } from '~/server/utils/ErrorHandler';
import { IGetProfileQueryParams } from '~/server/types/users-types';
import { getUserIdFromContext } from '~/server/utils/context';

export default defineEventHandler(async (event) => {
  try {
    const { profileId } = getQuery<IGetProfileQueryParams>(event);

    const currentUserId = getUserIdFromContext(event);

    const { profile } = await getProfile({
      profileId: profileId,
      currentUserId
    });

    return { profile };
  } catch (e) {
    return handleError(event, e);
  }
});
