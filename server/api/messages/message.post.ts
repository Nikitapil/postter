import { handleError } from '~/server/utils/ErrorHandler';
import { createMessage } from '~/server/services/messages';
import { getUserIdFromContext } from '~/server/utils/context';

export default defineEventHandler(async (event) => {
  try {
    const authorId = getUserIdFromContext(event);
    const { userToId, text } = await readBody(event);

    const message = await createMessage({ authorId, userToId, text });

    event.context.io
      .to(`chat_${message.message.chatId}`)
      .emit('message', message.message);
    return message;
  } catch (e) {
    return handleError(event, e);
  }
});
