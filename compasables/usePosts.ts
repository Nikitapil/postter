import {
  IGetPostsParams,
  ISinglePostResponse,
  IPost,
  IPostFormData,
  IPostsResponse
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

  const getPosts = async ({ query = '' }: IGetPostsParams = {}): Promise<
    IPost[]
  > => {
    try {
      const { posts } = await useFetchApi<IPostsResponse>('/api/user/tweets', {
        method: 'GET',
        params: {
          query
        }
      });
      return posts;
    } catch (e: any) {
      const { $toast } = useNuxtApp();
      $toast.error(e?.statusMessage || 'Error while getting posts');
      return [];
    }
  };

  const getPostById = async (postId: string): Promise<IPost | null> => {
    try {
      const { post } = await useFetchApi<ISinglePostResponse>(
        `/api/user/tweets/${postId}`,
        {
          method: 'GET'
        }
      );
      return post;
    } catch (e) {
      return null;
    }
  };

  return { createPost, getPosts, getPostById };
};
