<template>
  <div>
    <MainSection
      title="Bookmarks"
      :loading="loading"
    >
      <Head>
        <Title>Bookmarks / Postter</Title>
      </Head>
      <p class="dark:text-white text-sm pl-4">Posts you liked</p>
      <ListFeed
        :posts="posts"
        @feed-end="loadMorePosts"
      />
    </MainSection>
  </div>
</template>

<script setup lang="ts">
import ListFeed from '~/components/posts/ListFeed.vue';

const loading = ref(false);

const { useAuthUser } = useAuth();
const user = useAuthUser();

const { posts, getPosts } = usePostsFeed();

const loadMorePosts = async () => {
  await getPosts({
    likedByUserId: user.value?.id,
    isInitial: false
  });
};

onMounted(async () => {
  loading.value = true;
  await getPosts({
    likedByUserId: user.value?.id,
    isInitial: true
  });
  loading.value = false;
});
</script>
