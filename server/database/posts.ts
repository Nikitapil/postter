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

export const getPosts = async (search: string) => {
  // TODO pagination and feed filter(or create separated methods)
  const posts = await prisma.post.findMany({
    where: {
      text: {
        contains: search,
        mode: 'insensitive'
      }
    },
    include: postInclude,
    orderBy: [
      {
        createdAt: 'desc'
      }
    ]
  });
  return posts.map((post) => postTransformer(post));
};

export const getPostById = async (id: string) => {
  // TODO pagination for replies
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
