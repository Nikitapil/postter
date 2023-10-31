import formidable from 'formidable';
import { createTweet } from '~/server/database/posts';
import { tweetTransformer } from '~/server/transformers/posts';
import { createMediaFile } from '~/server/database/mediaFiles';
import { IPostDto } from '~/server/types/tweets-types';

export default defineEventHandler(async (event) => {
  const form = formidable({});

  try {
    const [fields, files] = await form.parse(event.node.req);

    const userId = event.context?.auth?.user?.id as string;

    const tweetData: IPostDto = {
      authorId: userId,
      text: fields.text?.toString() || ''
    };

    const replyToId = fields.replyToId?.toString() || '';

    if (replyToId) {
      tweetData.replyToId = replyToId;
    }

    console.log(userId);
    const tweet = await createTweet(tweetData);

    const filePromises = Object.keys(files).map(async (key) => {
      return createMediaFile({
        // TODO handle all the files from an array
        url: files[key]?.[0]?.filepath || '',
        userId: userId,
        postId: tweet.id
      });
    });

    const filesFromDb = await Promise.all(filePromises);

    return {
      post: { ...tweetTransformer(tweet), mediaFiles: filesFromDb }
    };
  } catch (e) {
    //TODO handle this error
    throw e;
  }
});
