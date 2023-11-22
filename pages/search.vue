<template>
  <div>
    <MainSection
      title="Search"
      :loading="loading"
    >
      <Head>
        <Title>Search / Postter</Title>
      </Head>

      <div class="md:hidden">
        <SearchForm
          :initial-value="$route.query.q"
          @search="onSearch"
        />
      </div>

      <ListFeed
        :posts="posts"
        @feed-end="loadMorePosts"
      />
    </MainSection>
  </div>
</template>

<script setup lang="ts">
import ListFeed from '~/components/posts/ListFeed.vue';
import SearchForm from '~/components/ui/SearchForm.vue';
import usePostsFeed from '~/composables/usePostsFeed';

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
    path: '/search',
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
