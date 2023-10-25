import { getTweetById } from '~/server/database/tweets';
import human from 'human-time';

export default defineEventHandler(async (event) => {
  const { id } = event.context.params as { id: string };

  const tweet = await getTweetById(id);

  return {
    // TODO get replies count and count of replies for replies from db, and handle this in service
    post: tweet
      ? {
          ...tweet,
          repliesCount: tweet.replies.length,
          postedAt: human(tweet.createdAt),
          replies: tweet.replies.map((reply) => ({
            ...reply,
            postedAt: human(reply.createdAt)
          }))
        }
      : null
  };
});
