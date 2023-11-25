import { handleError } from '~/server/utils/ErrorHandler';
import { getChat } from '~/server/services/messages';

export default defineEventHandler(async (event) => {
  try {
    const { chatId } = event.context.params as { chatId: string };
    const userId = event.context?.auth?.user?.id as string;

    const chat = await getChat({
      chatId,
      userId
    });

    return chat;
  } catch (e) {
    return handleError(event, e);
  }
});
