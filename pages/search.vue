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
import usePostsFeed from '~/compasables/usePostsFeed';

const { posts, getPostsWithReset, getPosts } = usePostsFeed();
const loading = ref(false);

const getSearchPosts = async () => {
  const route = useRoute();
  const searchQuery = route.query.q || '';
  loading.value = true;
  await getPostsWithReset({
    query: searchQuery as string
  });
  loading.value = false;
};

const loadMorePosts = async () => {
  const route = useRoute();
  const searchQuery = route.query.q || '';
  await getPosts({
    query: searchQuery as string
  });
};

const onSearch = (query: string) => {
  const router = useRouter();
  router.push({
    path: '/search',
    query: { q: query }
  });
};

// TODO get limited posts and load by scroll(implement infinite scroll)
onBeforeMount(async () => {
  await getSearchPosts();
});

watch(
  () => useRoute().fullPath,
  () => getSearchPosts()
);
</script>
