<template>
  <div>
    <Tweet :tweet="tweet" />
    <TweetForm placeholder="Tweet your reply" :user="user" :reply-to="tweet" />
    <TweetListFeed :tweets="tweet.replies" />
  </div>
</template>
<script setup lang="ts">
import {ITweet} from "~/types/tweet-client-types";
import {IUser} from "~/types/auth-types";

defineProps<{
  tweet: ITweet,
  user: IUser
}>()
</script>