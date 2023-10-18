<template>
  <div>

    <div v-if="!tweets.length" class="p-4">
      <p class="text-center text-gray-500">No tweets</p>
    </div>

    <ul v-else>
      <Tweet v-for="tweet in tweets" :key="tweet.id" :tweet="tweet" />
    </ul>

  </div>
</template>
<script setup lang="ts">
import {ITweet} from "~/types/tweet-client-types.js";

defineProps<{
  tweets: ITweet[]
}>()
</script>