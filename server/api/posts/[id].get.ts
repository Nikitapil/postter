import { getPostById } from '~/server/services/posts';
import { handleError } from '~/server/utils/ErrorHandler';
import { getQuery } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params as { id: string };
    const { page = 0, limit = 0 } = getQuery(event);

    const userId = event.context?.auth?.user?.id as string;

    const post = await getPostById({
      id,
      userId,
      repliesPage: +(page as number),
      repliesLimit: +(limit as number)
    });

    return { post };
  } catch (e) {
    return handleError(event, e);
  }
});
