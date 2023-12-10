import { login } from '~/server/services/users';
import { handleError } from '~/server/utils/ErrorHandler';
import { setRefreshTokenCookie } from '~/server/utils/cookies';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const { username, password } = body;

    const { user, refreshToken, accessToken } = await login({
      username,
      password
    });

    setRefreshTokenCookie(event, refreshToken);

    return {
      user,
      accessToken
    };
  } catch (e) {
    return handleError(event, e);
  }
});
