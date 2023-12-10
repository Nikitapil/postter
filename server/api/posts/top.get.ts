import { getQuery } from 'h3';
import { IPaginationQueryParams } from '~/server/types/common';
import { handleError } from '~/server/utils/ErrorHandler';
import { getTopPosts } from '~/server/services/posts';
import { getUserIdFromContext } from '~/server/utils/context';

export default defineEventHandler(async (event) => {
  try {
    const { page = 0, limit = 0 } = getQuery<IPaginationQueryParams>(event);
    const userId = getUserIdFromContext(event);

    const posts = await getTopPosts({
      userId,
      page: +page,
      limit: +limit
    });

    return posts;
  } catch (e) {
    return handleError(event, e);
  }
});
