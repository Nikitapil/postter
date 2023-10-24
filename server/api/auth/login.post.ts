import { sendError } from 'h3';
import { getUserByUsername } from '~/server/database/users';
import { userTransformer } from '~/server/transformers/user';
import bcrypt from 'bcrypt';
import { generateTokens } from '~/server/utils/jwt';
import { updateRefreshToken } from '~/server/database/refresh-tokens';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, password } = body;

  if (!username || !password) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: 'Invalid user data' })
    );
  }

  const user = await getUserByUsername(username);
  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Username or password is invalid'
      })
    );
  }

  const isPasswordsMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordsMatch) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Username or password is invalid'
      })
    );
  }

  const { accessToken, refreshToken } = generateTokens(user);

  // TODO dont create refresh token every time just update it
  await updateRefreshToken({ token: refreshToken, userId: user.id });

  setCookie(event, 'twi-refresh-token', refreshToken, {
    httpOnly: true,
    sameSite: true
  });

  return {
    accessToken,
    user: userTransformer(user)
  };
});
