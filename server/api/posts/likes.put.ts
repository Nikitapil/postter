import { handleError } from '~/server/utils/ErrorHandler';
import { toggleLike } from '~/server/services/posts';
import { getUserIdFromContext } from '~/server/utils/context';

export default defineEventHandler(async (event) => {
  try {
    const userId = getUserIdFromContext(event);
    const { postId } = await readBody(event);
    const response = await toggleLike({ userId, postId });
    return response;
  } catch (e) {
    return handleError(event, e);
  }
});
