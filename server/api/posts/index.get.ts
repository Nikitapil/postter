import { getPosts } from '~/server/services/posts';
import { getQuery } from 'h3';
import { handleError } from '~/server/utils/ErrorHandler';
import { IGePostsQueryParams } from '~/server/types/post-types';

export default defineEventHandler(async (event) => {
  try {
    const {
      query = '',
      page = 0,
      limit = 0,
      profileId,
      likedByUserId
    } = getQuery<IGePostsQueryParams>(event);

    const userId = event.context?.auth?.user?.id as string;

    const { posts, totalCount } = await getPosts({
      userId,
      search: query,
      page: +page,
      limit: +limit,
      profileId: profileId,
      likedByUserId: likedByUserId
    });

    return {
      posts,
      totalCount
    };
  } catch (e) {
    return handleError(event, e);
  }
});
