import { getQuery } from 'h3';
import { getReplies } from '~/server/services/posts';
import { handleError } from '~/server/utils/ErrorHandler';
import { IGetRepliesParams } from '~/server/types/post-types';

export default defineEventHandler(async (event) => {
  try {
    const { id = '', page = 0, limit = 0 } = getQuery<IGetRepliesParams>(event);
    const userId = event.context?.auth?.user?.id as string;

    const replies = await getReplies({
      id: id,
      userId,
      repliesPage: +page,
      repliesLimit: +limit
    });

    return { replies };
  } catch (e) {
    return handleError(event, e);
  }
});
