import UrlPattern from 'url-pattern';
import { decodeAccessToken } from '~/server/utils/jwt';
import { sendError } from 'h3';
import { getUserById } from '~/server/services/users';

export default defineEventHandler(async (event) => {
  const endpoints = [
    '/api/auth/user',
    '/api/posts',
    '/api/posts/:id',
    '/api/posts/likes'
  ];

  const isHandledByThisMiddleware = endpoints.some((endpoint) => {
    const pattern = new UrlPattern(endpoint);

    return pattern.match(event.path);
  });

  if (!isHandledByThisMiddleware) {
    return;
  }

  const token = event.headers.get('Authorization')?.split(' ')[1] || '';

  const decoded = decodeAccessToken(token);

  if (!decoded) {
    return sendError(
      event,
      createError({
        statusMessage: 'Invalid AccessToken',
        statusCode: 401
      })
    );
  }

  try {
    const userId = decoded.userId;
    const user = await getUserById(userId);

    if (!user) {
      return sendError(
        event,
        createError({
          statusMessage: 'Invalid AccessToken',
          statusCode: 401
        })
      );
    }

    event.context.auth = { user };
  } catch (e) {
    return sendError(
      event,
      createError({
        statusMessage: 'Something went wrong',
        statusCode: 400
      })
    );
  }
});
