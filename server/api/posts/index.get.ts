import { getPosts } from '~/server/services/posts';
import { getQuery } from 'h3';

export default defineEventHandler(async (event) => {
  const { query = '' } = getQuery(event);

  const posts = await getPosts({ search: query as string });

  return {
    posts
  };
});
