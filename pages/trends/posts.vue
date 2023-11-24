<template>
  <div
    v-if="isPostsLoading"
    class="flex justify-center"
  >
    <UiSpinner />
  </div>
  <ListFeed
    v-else
    :posts="posts"
  />
</template>

<script setup lang="ts">
import ListFeed from '~/components/posts/ListFeed.vue';

const { posts, getTopPosts } = usePostsFeed();
const isPostsLoading = ref(false);

onMounted(async () => {
  isPostsLoading.value = true;
  await getTopPosts({
    isInitial: true
  });
  isPostsLoading.value = false;
});
</script>
