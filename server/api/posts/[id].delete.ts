import { handleError } from '~/server/utils/ErrorHandler';
import { deletePost } from '~/server/services/posts';
import {
  getRouteParamsFromContext,
  getUserIdFromContext
} from '~/server/utils/context';

type TRouteParams = {
  id: string;
};

export default defineEventHandler(async (event) => {
  try {
    const { id: postId } = getRouteParamsFromContext<TRouteParams>(event);

    const userId = getUserIdFromContext(event);

    const response = await deletePost({ postId, userId });

    return response;
  } catch (e) {
    return handleError(event, e);
  }
});
