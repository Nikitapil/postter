<template>
  <div>
    <Post :post="tweet" />
    <PostForm
      placeholder="Tweet your reply"
      :user="user"
      :reply-to-id="tweet.id"
    />
    <ListFeed :posts="tweet.replies" />
  </div>
</template>
<script setup lang="ts">
import { IPost } from '~/types/tweet-client-types';
import { IUser } from '~/types/auth-types';
import PostForm from '~/components/posts/form/PostForm.vue';
import Post from '~/components/posts/Post.vue';
import ListFeed from '~/components/posts/ListFeed.vue';

defineProps<{
  tweet: IPost;
  user: IUser;
}>();
</script>
