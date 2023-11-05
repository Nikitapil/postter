import {
  IGetPostsParams,
  ISinglePostResponse,
  IPost,
  IPostFormData,
  IPostsResponse
} from '~/types/post-client-types';
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

      const { post } = await useFetchApi<ISinglePostResponse>('/api/posts', {
        method: 'POST',
        body: form
      });

      return post;
    } catch (e: any) {
      const { $toast } = useNuxtApp();
      $toast.error(e?.statusMessage || 'Error while creating post');
      return null;
    }
  };

  const getPosts = async ({
    query = '',
    page,
    limit
  }: IGetPostsParams = {}): Promise<IPostsResponse> => {
    try {
      const { posts, totalCount } = await useFetchApi<IPostsResponse>(
        '/api/posts',
        {
          method: 'GET',
          params: {
            query,
            page,
            limit
          }
        }
      );
      return { posts, totalCount };
    } catch (e: any) {
      const { $toast } = useNuxtApp();
      $toast.error(e?.statusMessage || 'Error while getting posts');
      return { posts: [], totalCount: 0 };
    }
  };

  const getPostById = async (postId: string): Promise<IPost | null> => {
    try {
      const { post } = await useFetchApi<ISinglePostResponse>(
        `/api/posts/${postId}`,
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
