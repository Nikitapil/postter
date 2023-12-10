import { getQuery } from 'h3';
import { IPaginationQueryParams } from '~/server/types/common';
import { getMyFeed } from '~/server/services/posts';
import { handleError } from '~/server/utils/ErrorHandler';
import { getUserIdFromContext } from '~/server/utils/context';

export default defineEventHandler(async (event) => {
  try {
    const { page = 0, limit = 0 } = getQuery<IPaginationQueryParams>(event);
    const userId = getUserIdFromContext(event);

    const posts = await getMyFeed({
      userId,
      page: +page,
      limit: +limit
    });

    return posts;
  } catch (e) {
    return handleError(event, e);
  }
});
