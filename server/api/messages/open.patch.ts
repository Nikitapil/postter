import { openMessages } from '~/server/services/messages';
import { getUserIdFromContext } from '~/server/utils/context';

export default defineEventHandler(async (event) => {
  try {
    const userId = getUserIdFromContext(event);
    const { chatId } = await readBody(event);

    const response = await openMessages({ userId, chatId });
    return response;
  } catch (e) {
    return handleError(event, e);
  }
});
