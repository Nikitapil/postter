import { IPostDto } from '~/server/types/tweets-types';
import { prisma } from '~/server/database/index';
import { postInclude } from '~/server/database/db-query-helpers';
import { ApiError } from '~/server/utils/ApiError';
import { postTransformer } from '~/server/transformers/posts';
import { z } from 'zod';
import { createMediaFile } from '~/server/database/mediaFiles';

const createPostSchema = z.object({
  authorId: z.string().min(1),
  text: z.string().min(1),
  replyToId: z.string().optional(),
  mediaFilesUrls: z.array(z.string().min(1))
});

export const createPost = async (postData: IPostDto) => {
  const { mediaFilesUrls, ...newPostData } = createPostSchema.parse(postData);
  const post = await prisma.post.create({
    data: newPostData,
    include: postInclude
  });

  const filesPromises = mediaFilesUrls.map((url) =>
    createMediaFile({
      url,
      userId: post.authorId,
      postId: post.id
    })
  );

  const files = await Promise.all(filesPromises);

  return { ...postTransformer(post), mediaFiles: files };
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
