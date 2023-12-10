import { EventHandlerRequest, H3Event } from 'h3';

export const getUserFromContext = (event: H3Event<EventHandlerRequest>) => {
  return event.context?.auth?.user?.id as string;
};
