import { IPostFromDb, ITransformedPost } from '~/server/types/post-types';
import human from 'human-time';

export const postTransformer = (post: IPostFromDb): ITransformedPost => {
  return {
    ...post,
    repliesCount: post._count.replies,
    likesCount: post._count.likes,
    postedAt: human(post.createdAt),
    isLiked: !!post.likes.length,
    replies:
      post.replies?.map((reply) => postTransformer(reply as IPostFromDb)) || []
  };
};
