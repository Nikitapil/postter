import { openMessages } from '~/server/services/messages';
import { getUserFromContext } from '~/server/utils/context';

export default defineEventHandler(async (event) => {
  try {
    const userId = getUserFromContext(event);
    const { chatId } = await readBody(event);

    const response = await openMessages({ userId, chatId });
    return response;
  } catch (e) {
    return handleError(event, e);
  }
});
