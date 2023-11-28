import { Prisma } from '.prisma/client';
import { IPaginationParams } from '~/server/types/db-types';

export const safeUserSelect: Prisma.UserSelect = {
  id: true,
  name: true,
  email: true,
  username: true,
  profileImage: true,
  about: true,
  createdAt: true,
  _count: {
    select: {
      followedBy: true,
      following: true
    }
  }
};

export const getSafeUserSelectWithFollowedBy = (
  userId: string
): Prisma.UserSelect => {
  return {
    ...safeUserSelect,
    followedBy: {
      where: { id: userId },
      select: safeUserSelect
    }
  };
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
      likes: true,
      reposts: true
    }
  },
  replyTo: {
    include: {
      author: {
        select: safeUserSelect
      }
    }
  },
  repostFrom: {
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

export const getChatInclude = (
  userId: string,
  messagesCount?: number,
  messagesOrder?: 'asc' | 'desc'
): Prisma.ChatInclude => {
  return {
    users: {
      select: getSafeUserSelectWithFollowedBy(userId)
    },
    messages: {
      include: {
        author: {
          select: getSafeUserSelectWithFollowedBy(userId)
        }
      },
      orderBy: {
        createdAt: messagesOrder || 'asc'
      },
      take: messagesCount
    },
    _count: {
      select: {
        messages: {
          where: {
            authorId: {
              not: userId
            },
            isOpened: false
          }
        }
      }
    }
  };
};
