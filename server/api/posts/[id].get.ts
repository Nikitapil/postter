import { getPostById } from '~/server/services/posts';
import { handleError } from '~/server/utils/ErrorHandler';
import { getQuery } from 'h3';
import { IPaginationQueryParams } from '~/server/types/common';
import {getRoutParamsFromContext, getUserIdFromContext} from '~/server/utils/context';

type TRouteParams = {
  id: string;
};

export default defineEventHandler(async (event) => {
  try {
    const { id } = getRoutParamsFromContext<TRouteParams>(event);
    const { page = 0, limit = 0 } = getQuery<IPaginationQueryParams>(event);

    const userId = getUserIdFromContext(event);

    const post = await getPostById({
      id,
      userId,
      repliesPage: +page,
      repliesLimit: +limit
    });

    return { post };
  } catch (e) {
    return handleError(event, e);
  }
});
