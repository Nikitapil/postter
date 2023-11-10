import { IGetPostsParams, IPost } from '~/types/post-client-types';
import usePosts from '~/composables/usePosts';

const POSTS_LIMIT = 50;

export default () => {
  const { getPosts: getPostsInitial } = usePosts();

  const posts = ref<IPost[]>([]);
  const totalCount = ref(0);
  const currentPage = computed(() =>
    Math.floor(posts.value.length / POSTS_LIMIT)
  );

  const getPosts = async ({ query = '' }: IGetPostsParams = {}) => {
    if (posts.value.length >= totalCount.value) {
      return;
    }
    console.log(currentPage.value)
    const loadedPosts = await getPostsInitial({
      query,
      page: currentPage.value + 1,
      limit: POSTS_LIMIT
    });
    posts.value.push(...loadedPosts.posts);
    totalCount.value = loadedPosts.totalCount;
  };

  const getPostsWithReset = async ({ query = '' }: IGetPostsParams = {}) => {
    const loadedPosts = await getPostsInitial({
      query,
      page: 1,
      limit: POSTS_LIMIT
    });
    posts.value = loadedPosts.posts;
    totalCount.value = loadedPosts.totalCount;
  };

  return { getPosts, getPostsWithReset, posts };
};
