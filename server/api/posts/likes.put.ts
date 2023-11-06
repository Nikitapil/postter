import { handleError } from '~/server/utils/ErrorHandler';
import { toggleLike } from '~/server/services/posts';

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context?.auth?.user?.id as string;
    const { postId } = await readBody(event);
    const response = await toggleLike({ userId, postId });
    return response;
  } catch (e) {
    return handleError(event, e);
  }
});
