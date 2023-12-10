import { removeRefreshToken } from '~/server/services/refresh-tokens';
import { handleError } from '~/server/utils/ErrorHandler';
import {
  deleteRefreshTokenCookie,
  getRefreshTokenCookie
} from '~/server/utils/cookies';

export default defineEventHandler(async (event) => {
  try {
    const token = getRefreshTokenCookie(event);

    await removeRefreshToken(token as string);

    deleteRefreshTokenCookie(event);

    return { message: 'Success' };
  } catch (e) {
    return handleError(event, e);
  }
});
