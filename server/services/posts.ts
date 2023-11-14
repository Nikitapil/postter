import {
  IGetPostById,
  IGetPostsRequest,
  IPostDto,
  IRepostParams,
  IToggleLike
} from '~/server/types/post-types';
import { prisma } from '~/server/services/index';
import {
  getPaginationParams,
  getPostIncludeWithUserLikes
} from '~/server/utils/db-query-helpers';
import { ApiError } from '~/server/utils/ApiError';
import { postTransformer } from '~/server/transformers/post-transformers';
import { z } from 'zod';
import { createMediaFile } from '~/server/services/mediaFiles';
import { Prisma } from '.prisma/client';

const createPostSchema = z.object({
  authorId: z.string().min(1),
  text: z.string().min(1),
  replyToId: z.string().optional(),
  repostFromId: z.string().optional(),
  mediaFilesUrls: z.array(z.string().min(1))
});

const getPostsSchema = z.object({
  search: z.string(),
  page: z.number().optional(),
  limit: z.number().optional(),
  userId: z.string().min(1),
  profileId: z.string().optional()
});

const getPostsByIdSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
  repliesPage: z.number().optional(),
  repliesLimit: z.number().optional()
});

const toggleLikeSchema = z.object({
  postId: z.string().min(1),
  userId: z.string().min(1)
});

const repostSchema = z.object({
  repostFromId: z.string().min(1),
  authorId: z.string().min(1)
});

export const createPost = async (postData: IPostDto) => {
  const { mediaFilesUrls, ...newPostData } = createPostSchema.parse(postData);
  const post = await prisma.post.create({
    data: newPostData,
    include: getPostIncludeWithUserLikes(newPostData.authorId)
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
  const { search, page, limit, userId, profileId } =
    getPostsSchema.parse(params);

  const paginationParams = getPaginationParams(page, limit);

  const where: Prisma.PostWhereInput = {
    text: {
      contains: search,
      mode: 'insensitive'
    },
    ...(profileId ? { authorId: profileId } : {})
  };

  const posts = await prisma.post.findMany({
    where,
    include: getPostIncludeWithUserLikes(userId),
    orderBy: [
      {
        createdAt: 'desc'
      }
    ],
    ...paginationParams
  });
  const totalCount = await prisma.post.count({
    where
  });
  return { posts: posts.map((post) => postTransformer(post)), totalCount };
};

export const getPostById = async (params: IGetPostById) => {
  const { id, repliesPage, repliesLimit, userId } =
    getPostsByIdSchema.parse(params);
  const paginationParams = getPaginationParams(repliesPage, repliesLimit);
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      ...getPostIncludeWithUserLikes(userId),
      replies: {
        include: { ...getPostIncludeWithUserLikes(userId) },
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

export const getReplies = async (params: IGetPostById) => {
  const { id, repliesPage, repliesLimit, userId } =
    getPostsByIdSchema.parse(params);
  const paginationParams = getPaginationParams(repliesPage, repliesLimit);
  const replies = await prisma.post.findMany({
    where: {
      replyToId: id
    },
    include: getPostIncludeWithUserLikes(userId),
    orderBy: [
      {
        createdAt: 'desc'
      }
    ],
    ...paginationParams
  });
  return replies.map((reply) => postTransformer(reply));
};

export const toggleLike = async (params: IToggleLike) => {
  const { postId, userId } = toggleLikeSchema.parse(params);
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      likes: {
        where: {
          userId: userId
        }
      }
    }
  });

  if (!post) {
    throw ApiError.NotFoundError('Post not found');
  }

  if (!post.likes.length) {
    await prisma.likes.create({
      data: { postId, userId }
    });
    return { isLiked: true };
  }

  await prisma.likes.delete({
    where: {
      uniq_id: {
        postId,
        userId
      }
    }
  });
  return { isLiked: false };
};

export const repost = async (params: IRepostParams) => {
  const { repostFromId, authorId } = repostSchema.parse(params);

  const originalPost = await prisma.post.findUnique({
    where: { id: repostFromId },
    include: {
      mediaFiles: {
        select: {
          url: true
        }
      }
    }
  });

  if (!originalPost) {
    throw ApiError.NotFoundError('Post not found');
  }

  const post = await createPost({
    authorId,
    text: originalPost.text,
    mediaFilesUrls: [],
    repostFromId
  });

  const mediaFiles = await Promise.all(
    originalPost.mediaFiles.map((file) =>
      prisma.mediaFile.create({
        data: {
          userId: authorId,
          postId: post.id,
          url: file.url
        },
        select: {
          id: true,
          url: true
        }
      })
    )
  );

  return { ...post, mediaFiles };
};
