import { handleError } from '~/server/utils/ErrorHandler';
import { getChat } from '~/server/services/messages';
import {
  getRouteParamsFromContext,
  getUserIdFromContext
} from '~/server/utils/context';

type TRouteParams = {
  chatId: string;
};

export default defineEventHandler(async (event) => {
  try {
    const { chatId } = getRouteParamsFromContext<TRouteParams>(event);
    const userId = getUserIdFromContext(event);

    const chat = await getChat({
      chatId,
      userId
    });

    return chat;
  } catch (e) {
    return handleError(event, e);
  }
});
