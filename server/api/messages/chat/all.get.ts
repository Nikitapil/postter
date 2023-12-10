import { handleError } from '~/server/utils/ErrorHandler';
import { getAllUserChats } from '~/server/services/messages';
import { getUserFromContext } from '~/server/utils/context';

export default defineEventHandler(async (event) => {
  try {
    const userId = getUserFromContext(event);

    const chats = await getAllUserChats({ userId });

    return chats;
  } catch (e) {
    return handleError(event, e);
  }
});
