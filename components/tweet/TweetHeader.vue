<template>
  <div class="flex p-4 pb-2">
    <div>
      <img class="w-10 h-10 rounded-full" :src="tweet.author.profileImage" alt="Tweet author avatar">
    </div>

    <div class="ml-3 w-full">
      <span class="font-medium text-gray-800 dark:text-white">{{ tweet.author.name }}</span>

      <span class="text-sm font-medium text-gray-400 ml-3 w-full">
<!--        TODO add link to user feed-->
        <NuxtLink class="mr-5" to="#">
           @{{tweet.author.username}}
        </NuxtLink>
         <span>{{ tweet.postedAt }}</span>
      </span>

      <div class="text-sm" v-if="tweet.replyTo">
        <span class="text-gray-500">Replying to</span>
        <NuxtLink class="text-blue-400" :to="replyToTweetUrl">
          @{{ tweet.replyTo.author.username }}
        </NuxtLink>
      </div>
    </div>



  </div>
</template>

<script lang="ts" setup>
import {ITweet} from "~/types/tweet-client-types";

const props = defineProps<{
  tweet: ITweet
}>()
const replyToTweetUrl = computed(() => `/status/${props.tweet.replyTo?.id}`)
</script>