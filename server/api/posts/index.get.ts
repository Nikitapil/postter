import { getPosts } from '~/server/services/posts';
import { getQuery } from 'h3';

export default defineEventHandler(async (event) => {
  const { query = '', page = 0, limit = 0 } = getQuery(event);

  const { posts, totalCount } = await getPosts({
    search: query as string,
    page: +(page as number),
    limit: +(limit as number)
  });

  return {
    posts,
    totalCount
  };
});
