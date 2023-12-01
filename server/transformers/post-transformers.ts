import { IPostFromDb, ITransformedPost } from '~/server/types/post-types';
import human from 'human-time';

export const postTransformer = (
  post: IPostFromDb,
  userId?: string
): ITransformedPost => {
  return {
    ...post,
    repliesCount: post._count.replies,
    likesCount: post._count.likes,
    repostsCount: post._count.reposts,
    postedAt: human(post.createdAt),
    isLiked: !!post.likes.length,
    canDelete: post.authorId === userId,
    replies:
      post.replies?.map((reply) =>
        postTransformer(reply as IPostFromDb, userId)
      ) || []
  };
};
