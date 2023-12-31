import {
  IDeletePostParams,
  IGetMyFeedParams,
  IGetPostById,
  IGetPostsBaseRequest,
  IGetPostsRequest,
  ICreatePostParams,
  IRepostParams,
  IToggleLike,
  IEditPostParams,
  IPostFromDb
} from '~/server/types/post-types';
import { prisma } from '~/server/services/prisma';
import {
  getPaginationParams,
  getPostIncludeWithUserLikes
} from '~/server/utils/db-query-helpers';
import { ApiError } from '~/server/utils/ApiError';
import { postTransformer } from '~/server/transformers/post-transformers';
import { z } from 'zod';
import { createMediaFile } from '~/server/services/mediaFiles';
import { Prisma } from '.prisma/client';

const idRequiredSchema = z.string().min(1);
const idOptionalSchema = z.string().optional();
const postTextSchema = z.string().min(1).max(800);
const mediaFilesSchema = z.array(z.string().min(1));
const searchSchema = z.string();

const pageOptionalSchema = z.number().optional();
const limitOptionalSchema = z.number().optional();

const createPostSchema = z.object({
  authorId: idRequiredSchema,
  text: postTextSchema,
  replyToId: idOptionalSchema,
  repostFromId: idOptionalSchema,
  mediaFilesUrls: mediaFilesSchema
});

const editPostSchema = z.object({
  postId: idRequiredSchema,
  userId: idRequiredSchema,
  text: postTextSchema,
  mediaFilesUrls: mediaFilesSchema
});

const getPostsSchema = z.object({
  search: searchSchema,
  page: pageOptionalSchema,
  limit: limitOptionalSchema,
  userId: idRequiredSchema,
  profileId: idOptionalSchema,
  likedByUserId: idOptionalSchema
});

const getMyFeedSchema = z.object({
  page: pageOptionalSchema,
  limit: limitOptionalSchema,
  userId: idRequiredSchema
});

const getTopPostsSchema = z.object({
  page: pageOptionalSchema,
  limit: limitOptionalSchema,
  userId: idRequiredSchema
});

const getPostsByIdSchema = z.object({
  id: idRequiredSchema,
  userId: idRequiredSchema,
  repliesPage: pageOptionalSchema,
  repliesLimit: limitOptionalSchema
});

const toggleLikeSchema = z.object({
  postId: idRequiredSchema,
  userId: idRequiredSchema
});

const repostSchema = z.object({
  repostFromId: idRequiredSchema,
  authorId: idRequiredSchema
});

const deletePostSchema = z.object({
  postId: idRequiredSchema,
  userId: idRequiredSchema
});

const createPostMediafiles = async (
  post: IPostFromDb,
  mediaFilesUrls: string[]
) => {
  const filesPromises = mediaFilesUrls.map((url) =>
    createMediaFile({
      url,
      userId: post.authorId,
      postId: post.id
    })
  );

  const files = await Promise.all(filesPromises);
  return files;
};

export const createPost = async (postData: ICreatePostParams) => {
  const { mediaFilesUrls, ...newPostData } = createPostSchema.parse(postData);
  const post = await prisma.post.create({
    data: newPostData,
    include: getPostIncludeWithUserLikes(newPostData.authorId)
  });

  const files = await createPostMediafiles(post, mediaFilesUrls);

  return { ...postTransformer(post, newPostData.authorId), mediaFiles: files };
};

export const editPost = async (params: IEditPostParams) => {
  const { postId, userId, text, mediaFilesUrls } = editPostSchema.parse(params);

  const post = await prisma.post.findUnique({
    where: { id: postId }
  });

  if (!post) {
    throw ApiError.NotFoundError('Post not found');
  }

  if (post.authorId !== userId) {
    throw ApiError.PermissionError();
  }

  const updatedPost = await prisma.post.update({
    where: {
      id: postId
    },
    data: {
      text,
      mediaFiles: {
        deleteMany: { postId }
      }
    },
    include: getPostIncludeWithUserLikes(userId)
  });

  const files = await createPostMediafiles(updatedPost, mediaFilesUrls);

  return { ...postTransformer(updatedPost, userId), mediaFiles: files };
};

export const getPosts = async (params: IGetPostsRequest) => {
  const { search, page, limit, userId, profileId, likedByUserId } =
    getPostsSchema.parse(params);

  const paginationParams = getPaginationParams(page, limit);

  const where: Prisma.PostWhereInput = {
    text: {
      contains: search,
      mode: 'insensitive'
    },
    ...(profileId ? { authorId: profileId } : {})
  };

  if (likedByUserId) {
    where.likes = {
      some: {
        userId: likedByUserId
      }
    };
  }

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
  return {
    posts: posts.map((post) => postTransformer(post, userId)),
    totalCount
  };
};

export const getTopPosts = async (params: IGetPostsBaseRequest) => {
  const { page, limit, userId } = getTopPostsSchema.parse(params);

  const paginationParams = getPaginationParams(page, limit);

  const posts = await prisma.post.findMany({
    include: getPostIncludeWithUserLikes(userId),
    orderBy: [
      {
        likes: {
          _count: 'desc'
        }
      },
      {
        createdAt: 'desc'
      }
    ],
    ...paginationParams
  });
  const totalCount = await prisma.post.count();
  return {
    posts: posts.map((post) => postTransformer(post, userId)),
    totalCount
  };
};

export const getMyFeed = async (params: IGetMyFeedParams) => {
  const { page, limit, userId } = getMyFeedSchema.parse(params);

  const where: Prisma.PostWhereInput = {
    author: {
      followedByIDs: {
        has: userId
      }
    }
  };

  const paginationParams = getPaginationParams(page, limit);

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

  return {
    posts: posts.map((post) => postTransformer(post, userId)),
    totalCount
  };
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

  return postTransformer(post, userId);
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

  return replies.map((reply) => postTransformer(reply, userId));
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

export const deletePost = async (params: IDeletePostParams) => {
  const { userId, postId } = deletePostSchema.parse(params);

  const post = await prisma.post.findUnique({
    where: { id: postId }
  });

  if (!post) {
    throw ApiError.NotFoundError('Post not found');
  }

  if (post.authorId !== userId) {
    throw ApiError.PermissionError();
  }

  // MongoDB do not support cascade delete
  await prisma.post.deleteMany({
    where: {
      OR: [
        {
          replyToId: postId
        },
        {
          repostFromId: postId
        }
      ]
    }
  });

  await prisma.mediaFile.deleteMany({
    where: {
      postId: postId
    }
  });

  await prisma.post.delete({
    where: { id: postId }
  });

  return { message: 'success' };
};
