import {
  IPostFromDb,
  ITransformedPost,
  ITweetFromDb
} from '~/server/types/post-types';
import human from 'human-time';

export const tweetTransformer = (tweet: ITweetFromDb) => {
  return {
    id: tweet.id,
    text: tweet.text
  };
};

export const postTransformer = (post: IPostFromDb): ITransformedPost => {
  return {
    ...post,
    repliesCount: post._count.replies,
    postedAt: human(post.createdAt),
    replies:
      post.replies?.map((reply) => postTransformer(reply as IPostFromDb)) || []
  };
};
