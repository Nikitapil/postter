import {
  IPost,
  IPostFormData,
  ISinglePostResponse
} from '~/types/post-client-types';
import usePosts from '~/composables/usePosts';
import useFetchApi from '~/composables/useFetchApi';

const REPLIES_LIMIT = 50;

export default () => {
  const { getPostById, getReplies, deletePost: deletePostInitial } = usePosts();

  const post = ref<IPost | null>(null);

  const currentRepliesPage = computed(() => {
    if (!post.value) {
      return 0;
    }
    return Math.floor(post.value.replies.length / REPLIES_LIMIT);
  });

  const getPost = async (postId: string) => {
    post.value = await getPostById({
      id: postId,
      page: 1,
      limit: REPLIES_LIMIT
    });
  };

  const loadMoreReplies = async () => {
    if (
      !post.value?.replies?.length ||
      post.value.replies.length >= (post.value.repliesCount || 0)
    ) {
      return;
    }
    const replies = await getReplies({
      id: post.value.id,
      page: currentRepliesPage.value + 1,
      limit: REPLIES_LIMIT
    });

    post.value.replies.push(...replies);
  };

  const deletePost = async () => {
    if (!post.value) {
      return false;
    }

    const isDeleted = await deletePostInitial(post.value.id);

    return isDeleted;
  };

  const editPost = async (data: IPostFormData) => {
    if (!post.value) {
      return null;
    }

    try {
      const form = new FormData();

      form.append('text', data.text);
      form.append('postId', post.value.id);

      data.mediaFiles.forEach((file) => {
        form.append(`media_file_${file.name}`, file);
      });

      const { post: updatedPost } = await useFetchApi<ISinglePostResponse>(
        '/api/posts/edit',
        {
          method: 'PUT',
          body: form
        }
      );
      post.value = updatedPost;
    } catch (e: any) {
      const { $toast } = useNuxtApp();
      $toast.error(e?.statusMessage || 'Error while editing post');
      return null;
    }
  };

  return { post, getPost, loadMoreReplies, deletePost, editPost };
};
