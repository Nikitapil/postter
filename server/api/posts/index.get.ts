import { getPosts } from '~/server/database/posts';
import { getQuery } from 'h3';

export default defineEventHandler(async (event) => {
  const { query = '' } = getQuery(event);

  const posts = await getPosts(query as string);

  return {
    posts
  };
});
