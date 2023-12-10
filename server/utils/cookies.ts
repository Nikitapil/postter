import { EventHandlerRequest, getCookie, H3Event } from 'h3';

const COOKIE_REFRESH_TOKEN_NAME = 'postter-refresh-token';

export const setRefreshTokenCookie = (
  event: H3Event<EventHandlerRequest>,
  token: string
) => {
  setCookie(event, COOKIE_REFRESH_TOKEN_NAME, token, {
    httpOnly: true,
    sameSite: true
  });
};

export const deleteRefreshTokenCookie = (
  event: H3Event<EventHandlerRequest>
) => {
  deleteCookie(event, COOKIE_REFRESH_TOKEN_NAME);
};

export const getRefreshTokenCookie = (event: H3Event<EventHandlerRequest>) => {
  return getCookie(event, COOKIE_REFRESH_TOKEN_NAME);
};
