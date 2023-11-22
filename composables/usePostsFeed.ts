import {
  IGetPostsParams,
  IGetPostsParamsExtended,
  IPost
} from '~/types/post-client-types';
import usePosts from '~/composables/usePosts';

const POSTS_LIMIT = 50;

export default () => {
  const {
    getPosts: getPostsInitial,
    getMyPosts,
    getTopPosts: getTopPostsInitial
  } = usePosts();

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
    const loadedPosts = isMyPostFeed
      ? await getMyPosts({
          page: isInitial ? 1 : currentPage.value + 1,
          limit: POSTS_LIMIT
        })
      : await getPostsInitial({
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

  const getTopPosts = async ({ isInitial, limit }: IGetPostsParamsExtended) => {
    if (!isInitial && posts.value.length >= totalCount.value) {
      return;
    }
    const loadedPosts = await getTopPostsInitial({
      page: isInitial ? 1 : currentPage.value + 1,
      limit: limit || POSTS_LIMIT
    });

    if (isInitial) {
      posts.value = loadedPosts.posts;
      totalCount.value = loadedPosts.totalCount;
    } else {
      posts.value.push(...loadedPosts.posts);
    }
  };

  return { getPosts, getTopPosts, posts };
};
