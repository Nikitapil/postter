import { handleError } from '~/server/utils/ErrorHandler';
import { getAllUserChats } from '~/server/services/messages';

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context?.auth?.user?.id as string;

    const chats = await getAllUserChats({ userId });

    return chats;
  } catch (e) {
    return handleError(event, e);
  }
});
