import { prisma } from '~/server/database/index';
import { ISaveRefreshTokenData } from '~/server/types/refresh-tokens-types';

export const updateRefreshToken = ({
  token,
  userId
}: ISaveRefreshTokenData) => {
  return prisma.refreshToken.upsert({
    where: { userId },
    create: {
      token,
      userId
    },
    update: {
      token
    }
  });
};

export const getRefreshTokenbyToken = (token: string) => {
  return prisma.refreshToken.findUnique({
    where: { token }
  });
};

export const removeRefreshToken = (token: string) => {
  return prisma.refreshToken.delete({
    where: {
      token
    }
  });
};
