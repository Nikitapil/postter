import { Prisma } from '.prisma/client';
import { IPaginationParams } from '~/server/types/db-types';

export const safeUserSelect: Prisma.UserSelect = {
  id: true,
  name: true,
  email: true,
  username: true,
  profileImage: true
};

export const postInclude: Prisma.PostInclude = {
  author: {
    select: safeUserSelect
  },
  mediaFiles: {
    select: {
      id: true,
      url: true
    }
  },
  _count: {
    select: {
      replies: true,
      likes: true
    }
  },
  replyTo: {
    include: {
      author: {
        select: safeUserSelect
      }
    }
  }
};

export const getPostIncludeWithUserLikes = (
  userId: string
): Prisma.PostInclude => {
  return {
    ...postInclude,
    likes: {
      where: {
        userId
      }
    }
  };
};

export const getPaginationParams = (page?: number, limit?: number) => {
  const paginationParams: IPaginationParams = {};
  if (page && limit) {
    const offset = page * limit - limit;
    paginationParams.take = limit;
    paginationParams.skip = offset;
  }
  return paginationParams;
};
