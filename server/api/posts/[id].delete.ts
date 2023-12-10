import { handleError } from '~/server/utils/ErrorHandler';
import { deletePost } from '~/server/services/posts';
import { getUserFromContext } from '~/server/utils/context';

export default defineEventHandler(async (event) => {
  try {
    const { id: postId } = event.context.params as {
      id: string;
    };

    const userId = getUserFromContext(event);

    const response = await deletePost({ postId, userId });

    return response;
  } catch (e) {
    return handleError(event, e);
  }
});
