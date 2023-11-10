import { getQuery } from 'h3';
import { getReplies } from '~/server/services/posts';
import { handleError } from '~/server/utils/ErrorHandler';

export default defineEventHandler(async (event) => {
  try {
    const { id = '', page = 0, limit = 0 } = getQuery(event);
    const userId = event.context?.auth?.user?.id as string;

    const replies = await getReplies({
      id: id as string,
      userId,
      repliesPage: +(page as number),
      repliesLimit: +(limit as number)
    });

    return { replies };
  } catch (e) {
    return handleError(event, e);
  }
});
