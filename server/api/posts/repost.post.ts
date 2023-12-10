import { handleError } from '~/server/utils/ErrorHandler';
import { repost } from '~/server/services/posts';
import { getUserIdFromContext } from '~/server/utils/context';

export default defineEventHandler(async (event) => {
  try {
    const authorId = getUserIdFromContext(event);
    const { repostFromId } = await readBody(event);
    const post = await repost({ authorId, repostFromId });
    return { post };
  } catch (e) {
    return handleError(event, e);
  }
});
