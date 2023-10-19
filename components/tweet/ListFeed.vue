<template>
  <div>

    <div v-if="!tweets.length" class="p-4">
      <p class="text-center text-gray-500">No tweets</p>
    </div>

    <ul v-else>
      <li v-for="tweet in tweets" :key="tweet.id" @click="redirectToTweet(tweet.id)">
        <Tweet :tweet="tweet" compact />
      </li>
    </ul>

  </div>
</template>
<script setup lang="ts">
import {ITweet} from "~/types/tweet-client-types.js";

defineProps<{
  tweets: ITweet[]
}>()

const redirectToTweet = (id: string) => {
  navigateTo(`/status/${id}`)
}
</script>