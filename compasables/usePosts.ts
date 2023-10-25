import {
  IGetTweetsParams,
  ISinglePostResponse,
  IPost,
  IPostFormData,
  ITweetResponse
} from '~/types/tweet-client-types';
import useFetchApi from '~/compasables/useFetchApi';

export default () => {
  const createPost = async (data: IPostFormData): Promise<IPost | null> => {
    try {
      const form = new FormData();

      form.append('text', data.text);

      data.mediaFiles.forEach((file) => {
        form.append(`media_file_${file.name}`, file);
      });

      if (data.replyToId) {
        form.append('replyToId', data.replyToId);
      }

      const { post } = await useFetchApi<ISinglePostResponse>(
        '/api/user/tweets',
        {
          method: 'POST',
          body: form
        }
      );

      return post;
    } catch (e: any) {
      const { $toast } = useNuxtApp();
      $toast.error(e?.statusMessage || 'Error while creating post');
      return null;
    }
  };

  const getTweets = async ({ query = '' }: IGetTweetsParams = {}): Promise<
    IPost[]
  > => {
    try {
      const { tweets } = await useFetchApi<ITweetResponse>('/api/user/tweets', {
        method: 'GET',
        params: {
          query
        }
      });
      return tweets;
    } catch (e) {
      // TODO handle this error
      throw e;
    }
  };

  const getTweetById = async (tweetId: string): Promise<IPost | null> => {
    try {
      const { tweet } = await useFetchApi<ISinglePostResponse>(
        `/api/user/tweets/${tweetId}`,
        {
          method: 'GET'
        }
      );
      return tweet;
    } catch (e) {
      return null;
    }
  };

  return { createPost, getTweets, getTweetById };
};
