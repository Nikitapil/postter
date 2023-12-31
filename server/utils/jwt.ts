import jwt, { JwtPayload } from 'jsonwebtoken';
import { ISafeUserFromDb } from '~/server/types/users-types';

const generateAccessToken = (user: ISafeUserFromDb) => {
  const config = useRuntimeConfig();

  return jwt.sign({ userId: user.id }, config.jwtAccessSecret, {
    expiresIn: '10m'
  });
};

const generateRefreshToken = (user: ISafeUserFromDb) => {
  const config = useRuntimeConfig();

  return jwt.sign({ userId: user.id }, config.jwtRefreshSecret, {
    expiresIn: '4h'
  });
};

export const decodeRefreshToken = (token: string) => {
  const config = useRuntimeConfig();
  try {
    return jwt.verify(token, config.jwtRefreshSecret) as JwtPayload;
  } catch (e) {
    return null;
  }
};

export const decodeAccessToken = (token: string) => {
  const config = useRuntimeConfig();
  try {
    return jwt.verify(token, config.jwtAccessSecret) as JwtPayload;
  } catch (e) {
    return null;
  }
};

export const generateTokens = (user: ISafeUserFromDb) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    accessToken,
    refreshToken
  };
};
