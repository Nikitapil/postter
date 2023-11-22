import {
  IGetPostsParams,
  ISinglePostResponse,
  IPost,
  IPostFormData,
  IPostsResponse,
  IGetPostByIdParams,
  IRepliesResponse,
  ILikesResponse
} from '~/types/post-client-types';
import useFetchApi from '~/composables/useFetchApi';

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
    limit,
    profileId,
    likedByUserId
  }: IGetPostsParams = {}): Promise<IPostsResponse> => {
    try {
      const { posts, totalCount } = await useFetchApi<IPostsResponse>(
        '/api/posts',
        {
          method: 'GET',
          params: {
            query,
            page,
            limit,
            profileId,
            likedByUserId
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

  const getMyPosts = async ({
    page,
    limit
  }: IGetPostsParams = {}): Promise<IPostsResponse> => {
    try {
      const { posts, totalCount } = await useFetchApi<IPostsResponse>(
        '/api/posts/my-feed',
        {
          method: 'GET',
          params: {
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

  const getPostById = async ({
    id,
    page,
    limit
  }: IGetPostByIdParams): Promise<IPost | null> => {
    try {
      const { post } = await useFetchApi<ISinglePostResponse>(
        `/api/posts/${id}`,
        {
          method: 'GET',
          params: {
            page,
            limit
          }
        }
      );
      return post;
    } catch (e) {
      return null;
    }
  };

  const getReplies = async ({
    id,
    page,
    limit
  }: IGetPostByIdParams): Promise<IPost[]> => {
    try {
      const { replies } = await useFetchApi<IRepliesResponse>(
        `/api/posts/replies`,
        {
          method: 'GET',
          params: {
            id,
            page,
            limit
          }
        }
      );
      return replies;
    } catch (e) {
      return [];
    }
  };

  const toggleLike = async (post: IPost) => {
    try {
      const { isLiked } = await useFetchApi<ILikesResponse>(
        '/api/posts/likes',
        {
          method: 'PUT',
          body: { postId: post.id }
        }
      );
      post.isLiked = isLiked;
      if (isLiked) {
        post.likesCount++;
      } else {
        post.likesCount--;
      }
    } catch (e: any) {
      const { $toast } = useNuxtApp();
      $toast.error(e?.statusMessage || 'Error on like method');
    }
  };

  const repost = async (repostFromId: string) => {
    try {
      const { post } = await useFetchApi<ISinglePostResponse>(
        '/api/posts/repost',
        {
          method: 'POST',
          body: { repostFromId }
        }
      );
      return post.id;
    } catch (e: any) {
      const { $toast } = useNuxtApp();
      $toast.error(e?.statusMessage || 'Error on like method');
    }
  };

  return { createPost, getPosts, getPostById, getReplies, toggleLike, repost, getMyPosts };
};
