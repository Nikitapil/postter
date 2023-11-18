<template>
  <div>
    <MainSection
      title="Bookmarks"
      :loading="loading"
    >
      <p class="dark:text-white text-sm pl-4">Posts you liked</p>
      <ListFeed :posts="posts" @feed-end="loadMorePosts" />
    </MainSection>
  </div>
</template>

<script setup lang="ts">
import ListFeed from '~/components/posts/ListFeed.vue';

const loading = ref(false);

const { useAuthUser } = useAuth();
const user = useAuthUser();

const { posts, getPostsWithReset, getPosts } = usePostsFeed();

const loadMorePosts = async () => {
  await getPosts({
    likedByUserId: user.value?.id
  });
};

onMounted(async () => {
  loading.value = true;
  await getPostsWithReset({
    likedByUserId: user.value?.id
  });
  loading.value = false;
});
</script>
