import { handleError } from '~/server/utils/ErrorHandler';
import { getAllUserChats } from '~/server/services/messages';
import { getUserIdFromContext } from '~/server/utils/context';

export default defineEventHandler(async (event) => {
  try {
    const userId = getUserIdFromContext(event);

    const chats = await getAllUserChats({ userId });

    return chats;
  } catch (e) {
    return handleError(event, e);
  }
});
