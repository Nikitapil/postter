import { handleError } from '~/server/utils/ErrorHandler';
import { getChat } from '~/server/services/messages';
import { getUserFromContext } from '~/server/utils/context';

export default defineEventHandler(async (event) => {
  try {
    const { chatId } = event.context.params as { chatId: string };
    const userId = getUserFromContext(event);

    const chat = await getChat({
      chatId,
      userId
    });

    return chat;
  } catch (e) {
    return handleError(event, e);
  }
});
