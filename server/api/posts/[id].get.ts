import { getPostById } from '~/server/database/posts';
import { handleError } from '~/server/utils/ErrorHandler';

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params as { id: string };

    const post = await getPostById(id);

    return { post };
  } catch (e) {
    return handleError(event, e);
  }
});
