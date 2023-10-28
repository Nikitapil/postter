<template>
  <div>
    <MainSection
      title="Search"
      :loading="loading"
    >
      <Head>
        <Title>Search / Twitter</Title>
      </Head>

      <ListFeed :posts="searchTweets" />
    </MainSection>
  </div>
</template>

<script setup lang="ts">
import ListFeed from '~/components/posts/ListFeed.vue';
import useTweets from '~/compasables/usePosts';
import { IPost } from '~/types/tweet-client-types';

const { getPosts } = useTweets();
const loading = ref(false);

const searchTweets = ref<IPost[]>([]);

const getSearchTweets = async () => {
  const route = useRoute();
  const searchQuery = route.query.q;
  loading.value = true;
  searchTweets.value = await getPosts({
    query: searchQuery as string
  });
  loading.value = false;
};

// TODO get limited tweets and load by scroll(implement infinite scroll)
// TODO update tweets on search update
onBeforeMount(async () => {
  await getSearchTweets();
});

watch(
  () => useRoute().fullPath,
  () => getSearchTweets()
);
</script>
