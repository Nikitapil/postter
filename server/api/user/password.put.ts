import { handleError } from '~/server/utils/ErrorHandler';
import { changePassword } from '~/server/services/users';
import { getUserIdFromContext } from '~/server/utils/context';

export default defineEventHandler(async (event) => {
  try {
    const userId = getUserIdFromContext(event);

    const { currentPassword, newPassword, repeatPassword } =
      await readBody(event);

    const response = await changePassword({
      userId,
      currentPassword,
      newPassword,
      repeatPassword
    });

    return response;
  } catch (e) {
    return handleError(event, e);
  }
});
