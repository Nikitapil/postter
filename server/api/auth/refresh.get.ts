import { refreshAuth } from '~/server/services/users';
import { handleError } from '~/server/utils/ErrorHandler';
import {
  getRefreshTokenCookie,
  setRefreshTokenCookie
} from '~/server/utils/cookies';

export default defineEventHandler(async (event) => {
  try {
    const refreshTokenFromCookie = getRefreshTokenCookie(event);
    const { accessToken, refreshToken, user } = await refreshAuth(
      refreshTokenFromCookie
    );

    setRefreshTokenCookie(event, refreshToken);

    return { accessToken, user };
  } catch (e) {
    return handleError(event, e);
  }
});
