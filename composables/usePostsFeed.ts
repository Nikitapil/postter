import {
  IGetPostsParams,
  IGetPostsParamsExtended,
  IPost
} from '~/types/post-client-types';
import usePosts from '~/composables/usePosts';

const POSTS_LIMIT = 50;

export default () => {
  const { getPosts: getPostsInitial } = usePosts();

  const posts = ref<IPost[]>([]);
  const totalCount = ref(0);
  const currentPage = computed(() =>
    Math.floor(posts.value.length / POSTS_LIMIT)
  );

  const getPosts = async ({
    query = '',
    profileId,
    likedByUserId,
    isInitial,
    isMyPostFeed
  }: IGetPostsParamsExtended = {}) => {
    if (!isInitial && posts.value.length >= totalCount.value) {
      return;
    }
    const loadedPosts = await getPostsInitial({
      query,
      page: isInitial ? 1 : currentPage.value + 1,
      limit: POSTS_LIMIT,
      profileId,
      likedByUserId
    });

    if (isInitial) {
      posts.value = loadedPosts.posts;
      totalCount.value = loadedPosts.totalCount;
    } else {
      posts.value.push(...loadedPosts.posts);
    }
  };

  return { getPosts, posts };
};
