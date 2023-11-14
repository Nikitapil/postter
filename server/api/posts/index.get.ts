import { getPosts } from '~/server/services/posts';
import { getQuery } from 'h3';
import { handleError } from '~/server/utils/ErrorHandler';

export default defineEventHandler(async (event) => {
  try {
    const { query = '', page = 0, limit = 0, profileId } = getQuery(event);

    const userId = event.context?.auth?.user?.id as string;

    const { posts, totalCount } = await getPosts({
      userId,
      search: query as string,
      page: +(page as number),
      limit: +(limit as number),
      profileId: profileId as string | undefined
    });

    return {
      posts,
      totalCount
    };
  } catch (e) {
    console.log(e);
    return handleError(event, e);
  }
});
