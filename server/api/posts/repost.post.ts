import { handleError } from '~/server/utils/ErrorHandler';
import { repost } from '~/server/services/posts';

export default defineEventHandler(async (event) => {
  try {
    const authorId = event.context?.auth?.user?.id as string;
    const { repostFromId } = await readBody(event);
    const post = await repost({ authorId, repostFromId });
    return { post };
  } catch (e) {
    return handleError(event, e);
  }
});
