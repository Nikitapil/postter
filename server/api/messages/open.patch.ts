import { openMessages } from '~/server/services/messages';

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context?.auth?.user?.id as string;
    const { chatId } = await readBody(event);

    const response = await openMessages({ userId, chatId });
    return response;
  } catch (e) {
    return handleError(event, e);
  }
});
