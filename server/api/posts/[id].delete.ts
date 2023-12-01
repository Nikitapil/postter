import { handleError } from '~/server/utils/ErrorHandler';
import { deletePost } from '~/server/services/posts';

export default defineEventHandler(async (event) => {
  try {
    const { postId, userId } = event.context.params as {
      postId: string;
      userId: string;
    };

    const response = await deletePost({ postId, userId });

    return response;
  } catch (e) {
    return handleError(event, e);
  }
});
