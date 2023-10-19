<template>
  <div class="flex items-center justify-around w-full">
    <TweetActionsIcon>
      <template #icon="{ classes }">
        <ChatBubbleBottomCenterTextIcon :class="classes" />
      </template>

      <template #default>
        {{ tweet.repliesCount }}
      </template>
    </TweetActionsIcon>

    <TweetActionsIcon>
      <template #icon="{ classes }">
        <ArrowPathIcon :class="classes" />
      </template>

      <template #default>
        {{ getRandomNumber() }}
      </template>
    </TweetActionsIcon>

    <TweetActionsIcon>
      <template #icon="{ classes }">
        <HeartIcon :class="classes" />
      </template>

      <template #default>
        {{ getRandomNumber() }}
      </template>
    </TweetActionsIcon>

    <TweetActionsIcon>
      <template #icon="{ classes }">
        <ArrowUpTrayIcon :class="classes" />
      </template>

      <template #default>
        {{ getRandomNumber() }}
      </template>
    </TweetActionsIcon>
  </div>
</template>

<script setup lang="ts">
import TweetActionsIcon from "~/components/tweet/TweetActions/TweetActionsIcon.vue";
import { ChatBubbleBottomCenterTextIcon, ArrowPathIcon, HeartIcon, ArrowUpTrayIcon } from '@heroicons/vue/24/outline'
import {ITweet} from "~/types/tweet-client-types";

defineProps<{
  tweet: ITweet
}>()

// TODO delete this after implementing of retweets, likes and shares
const getRandomNumber = () => Math.floor(Math.random() * 101)
</script>