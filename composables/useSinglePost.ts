import { IPost } from '~/types/post-client-types';
import usePosts from '~/composables/usePosts';

const REPLIES_LIMIT = 50;
export default () => {
  const { getPostById, getReplies } = usePosts();

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

  return { post, getPost, loadMoreReplies };
};
