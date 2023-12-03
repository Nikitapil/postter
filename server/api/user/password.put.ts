import { handleError } from '~/server/utils/ErrorHandler';
import { changePassword } from '~/server/services/users';

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context?.auth?.user?.id as string;
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
