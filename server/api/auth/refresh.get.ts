import { getCookie } from 'h3';
import { refreshAuth } from '~/server/services/users';
import { handleError } from '~/server/utils/ErrorHandler';

export default defineEventHandler(async (event) => {
  try {
    const refreshTokenFromCookie = getCookie(event, 'postter-refresh-token');
    const { accessToken, refreshToken, user } = await refreshAuth(
      refreshTokenFromCookie
    );

    setCookie(event, 'postter-refresh-token', refreshToken, {
      httpOnly: true,
      sameSite: true
    });
    return { accessToken, user };
  } catch (e) {
    return handleError(event, e);
  }
});
