<template>
  <div>
    <Tweet :tweet="tweet" />
    <PostForm
      placeholder="Tweet your reply"
      :user="user"
      :reply-to-id="tweet.id"
    />
    <TweetListFeed :tweets="tweet.replies" />
  </div>
</template>
<script setup lang="ts">
import { IPost } from '~/types/tweet-client-types';
import { IUser } from '~/types/auth-types';
import PostForm from '~/components/posts/form/PostForm.vue';

defineProps<{
  tweet: IPost;
  user: IUser;
}>();
</script>
