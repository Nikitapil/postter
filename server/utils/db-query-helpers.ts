import { Prisma } from '.prisma/client';

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
      replies: true
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
