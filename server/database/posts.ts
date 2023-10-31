import { IPostDto } from '~/server/types/tweets-types';
import { prisma } from '~/server/database/index';
import { postInclude } from '~/server/database/db-query-helpers';
import { ApiError } from '~/server/utils/ApiError';
import { postTransformer } from '~/server/transformers/posts';

export const createTweet = (postData: IPostDto) => {
  return prisma.post.create({
    data: postData
  });
};

export const getTweets = (search: string) => {
  // TODO refactor this, if for replies need only count than get only count of them
  return prisma.post.findMany({
    where: {
      text: {
        contains: search,
        mode: 'insensitive'
      }
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          username: true,
          profileImage: true
        }
      },
      mediaFiles: {
        select: {
          id: true,
          url: true
        }
      },
      replies: {
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              username: true,
              profileImage: true
            }
          }
        }
      },
      replyTo: {
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              username: true,
              profileImage: true
            }
          }
        }
      }
    },
    orderBy: [
      {
        createdAt: 'desc'
      }
    ]
  });
};

export const getPostById = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      ...postInclude,
      replies: {
        include: { ...postInclude }
      }
    }
  });
  if (!post) {
    throw ApiError.NotFoundError('Post not found');
  }
  return postTransformer(post);
};
