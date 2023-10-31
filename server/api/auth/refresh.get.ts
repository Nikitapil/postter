import { getCookie } from 'h3';
import { refreshAuth } from '~/server/database/users';
import { handleError } from '~/server/utils/ErrorHandler';

export default defineEventHandler(async (event) => {
  try {
    const refreshTokenFromCookie = getCookie(event, 'twi-refresh-token');
    const { accessToken, refreshToken, user } = await refreshAuth(
      refreshTokenFromCookie
    );

    setCookie(event, 'twi-refresh-token', refreshToken, {
      httpOnly: true,
      sameSite: true
    });
    return { accessToken, user };
  } catch (e) {
    return handleError(event, e);
  }
});
