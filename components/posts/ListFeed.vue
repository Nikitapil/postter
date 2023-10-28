<template>
  <div>
    <div
      v-if="!posts.length"
      class="p-4"
    >
      <p class="text-center text-gray-500">No posts</p>
    </div>

    <ul v-else>
      <li
        v-for="post in posts"
        :key="post.id"
        @click="redirectToPost(post.id)"
      >
        <Post
          :post="post"
          compact
        />
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { IPost } from '~/types/tweet-client-types.js';
import Post from '~/components/posts/Post.vue';

defineProps<{
  posts: IPost[];
}>();

const redirectToPost = (id: string) => {
  navigateTo(`/status/${id}`);
};
</script>
