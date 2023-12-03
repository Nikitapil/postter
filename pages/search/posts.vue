<template>
  <div>
    <div class="md:hidden">
      <SearchForm
        :initial-value="$route.query.q"
        placeholder="Search posts"
        @search="onSearch"
      />
    </div>

    <div
      v-if="loading"
      class="flex justify-center"
    >
      <UiSpinner />
    </div>

    <ListFeed
      v-else
      :posts="posts"
      @feed-end="loadMorePosts"
    />
  </div>
</template>

<script setup lang="ts">
import SearchForm from '~/components/ui/SearchForm.vue';
import ListFeed from '~/components/posts/ListFeed.vue';

const { posts, getPosts } = usePostsFeed();
const loading = ref(false);

const getSearchPosts = async () => {
  const route = useRoute();
  const searchQuery = route.query.q || '';
  loading.value = true;
  await getPosts({
    query: searchQuery as string,
    isInitial: true
  });
  loading.value = false;
};

const loadMorePosts = async () => {
  const route = useRoute();
  const searchQuery = route.query.q || '';
  await getPosts({
    query: searchQuery as string,
    isInitial: false
  });
};

const onSearch = (query: string) => {
  const router = useRouter();
  router.push({
    path: '/search/posts',
    query: { q: query }
  });
};

onBeforeMount(async () => {
  await getSearchPosts();
});

watch(
  () => useRoute().fullPath,
  () => getSearchPosts()
);
</script>
