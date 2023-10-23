import { ApiError } from '~/server/utils/ApiError';
import { EventHandlerRequest, H3Event, sendError } from 'h3';

export const handleError = (
  event: H3Event<EventHandlerRequest>,
  error: any,
  defaultMessage: string = 'Something went wrong'
) => {
  if (error instanceof ApiError) {
    return sendError(event, createError({ ...error }));
  }
  return sendError(
    event,
    createError({ statusCode: 400, statusMessage: defaultMessage })
  );
};
