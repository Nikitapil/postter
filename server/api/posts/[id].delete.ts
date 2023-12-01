import { handleError } from '~/server/utils/ErrorHandler';
import { deletePost } from '~/server/services/posts';

export default defineEventHandler(async (event) => {
  try {
    const { id: postId } = event.context.params as {
      id: string;
    };

    const userId = event.context?.auth?.user?.id as string;

    const response = await deletePost({ postId, userId });

    return response;
  } catch (e) {
    return handleError(event, e);
  }
});
