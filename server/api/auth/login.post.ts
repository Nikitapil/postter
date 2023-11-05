import { login } from '~/server/services/users';
import { handleError } from '~/server/utils/ErrorHandler';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const { username, password } = body;

    const { user, refreshToken, accessToken } = await login({
      username,
      password
    });

    setCookie(event, 'postter-refresh-token', refreshToken, {
      httpOnly: true,
      sameSite: true
    });

    return {
      user,
      accessToken
    };
  } catch (e) {
    return handleError(event, e);
  }
});
