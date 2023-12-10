import { EventHandlerRequest, H3Event } from 'h3';

export const getUserIdFromContext = (event: H3Event<EventHandlerRequest>) => {
  return event.context?.auth?.user?.id as string;
};

export const getRoutParamsFromContext = <T>(
  event: H3Event<EventHandlerRequest>
): T => {
  return event.context.params as T;
};
