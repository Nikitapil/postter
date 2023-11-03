import { IPostFromDb, ITransformedPost } from '~/server/types/post-types';
import human from 'human-time';

export const postTransformer = (post: IPostFromDb): ITransformedPost => {
  return {
    ...post,
    repliesCount: post._count.replies,
    postedAt: human(post.createdAt),
    replies:
      post.replies?.map((reply) => postTransformer(reply as IPostFromDb)) || []
  };
};
