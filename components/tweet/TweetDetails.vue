<template>
  <div>
    <Tweet :tweet="tweet" />
    <TweetForm
      placeholder="Tweet your reply"
      :user="user"
      :reply-to="tweet"
    />
    <TweetListFeed :tweets="tweet.replies" />
  </div>
</template>
<script setup lang="ts">
import { IPost } from '~/types/tweet-client-types';
import { IUser } from '~/types/auth-types';

defineProps<{
  tweet: IPost;
  user: IUser;
}>();
</script>
