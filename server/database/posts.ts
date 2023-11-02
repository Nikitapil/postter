import {
  IGetPostById,
  IGetPostsRequest,
  IPostDto
} from '~/server/types/post-types';
import { prisma } from '~/server/database/index';
import {
  getPaginationParams,
  postInclude
} from '~/server/utils/db-query-helpers';
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

const getPostsSchema = z.object({
  search: z.string(),
  page: z.number().optional(),
  limit: z.number().optional()
});

const getPostsByIdSchema = z.object({
  id: z.string().min(1),
  repliesPage: z.number().optional(),
  repliesLimit: z.number().optional()
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

export const getPosts = async (params: IGetPostsRequest) => {
  // TODO feed filter(or create separated methods)
  const { search, page, limit } = getPostsSchema.parse(params);
  const paginationParams = getPaginationParams(page, limit);
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
    ],
    ...paginationParams
  });
  return posts.map((post) => postTransformer(post));
};

export const getPostById = async (params: IGetPostById) => {
  const { id, repliesPage, repliesLimit } = getPostsByIdSchema.parse(params);
  const paginationParams = getPaginationParams(repliesPage, repliesLimit);
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      ...postInclude,
      replies: {
        include: { ...postInclude },
        orderBy: [
          {
            createdAt: 'desc'
          }
        ],
        ...paginationParams
      }
    }
  });
  if (!post) {
    throw ApiError.NotFoundError('Post not found');
  }
  return postTransformer(post);
};
