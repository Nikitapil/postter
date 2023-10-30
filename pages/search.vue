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

      <ListFeed :posts="searchPosts" />
    </MainSection>
  </div>
</template>

<script setup lang="ts">
import ListFeed from '~/components/posts/ListFeed.vue';
import { IPost } from '~/types/tweet-client-types';
import SearchForm from '~/components/ui/SearchForm.vue';
import usePosts from '~/compasables/usePosts';

const { getPosts } = usePosts();
const loading = ref(false);

const searchPosts = ref<IPost[]>([]);

const getSearchPosts = async () => {
  const route = useRoute();
  const searchQuery = route.query.q || '';
  loading.value = true;
  searchPosts.value = await getPosts({
    query: searchQuery as string
  });
  loading.value = false;
};

const onSearch = (query: string) => {
  const router = useRouter();
  router.push({
    path: '/search',
    query: { q: query }
  });
};

// TODO get limited tweets and load by scroll(implement infinite scroll)
onBeforeMount(async () => {
  await getSearchPosts();
});

watch(
  () => useRoute().fullPath,
  () => getSearchPosts()
);
</script>
