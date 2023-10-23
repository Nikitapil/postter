import { ApiError } from '~/server/utils/ApiError';
import { EventHandlerRequest, H3Event, sendError } from 'h3';
import { ZodError } from 'zod';

const zodErrorsHandler = (e: ZodError) => {
  const message = e.errors
    .map((err) => `${err.path[0]}: ${err.message}`)
    .join(', ');
  return { statusCode: 400, statusMessage: message };
};

export const handleError = (
  event: H3Event<EventHandlerRequest>,
  error: any,
  defaultMessage: string = 'Something went wrong'
) => {
  if (error instanceof ApiError) {
    return sendError(event, createError({ ...error }));
  }
  if (error instanceof ZodError) {
    return sendError(event, createError({ ...zodErrorsHandler(error) }));
  }
  return sendError(
    event,
    createError({ statusCode: 400, statusMessage: defaultMessage })
  );
};
