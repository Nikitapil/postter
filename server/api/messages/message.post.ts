import { handleError } from '~/server/utils/ErrorHandler';
import { createMessage } from '~/server/services/messages';

export default defineEventHandler(async (event) => {
  try {
    const authorId = event.context?.auth?.user?.id as string;
    const { userToId, text } = await readBody(event);
    const message = await createMessage({ authorId, userToId, text });
    return message;
  } catch (e) {
    return handleError(event, e);
  }
});
