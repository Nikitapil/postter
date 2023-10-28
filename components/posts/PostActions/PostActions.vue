<template>
  <div class="flex items-center justify-around w-full">
    <PostActionsIcon @click="$emit('commentClick')">
      <template #icon="{ classes }">
        <ChatBubbleBottomCenterTextIcon :class="classes" />
      </template>

      <template #default>
        {{ post.repliesCount }}
      </template>
    </PostActionsIcon>

    <PostActionsIcon appearance="green">
      <template #icon="{ classes }">
        <ArrowPathIcon :class="classes" />
      </template>

      <template #default>
        {{ getRandomNumber() }}
      </template>
    </PostActionsIcon>

    <PostActionsIcon appearance="red">
      <template #icon="{ classes }">
        <HeartIcon :class="classes" />
      </template>

      <template #default>
        {{ getRandomNumber() }}
      </template>
    </PostActionsIcon>
  </div>
</template>

<script setup lang="ts">
import {
  ChatBubbleBottomCenterTextIcon,
  ArrowPathIcon,
  HeartIcon
} from '@heroicons/vue/24/outline';
import { IPost } from '~/types/tweet-client-types';
import PostActionsIcon from '~/components/posts/PostActions/PostActionsIcon.vue';

defineProps<{
  post: IPost;
}>();

defineEmits<{
  commentClick: [];
}>();

// TODO delete this after implementing of retweets, likes and shares
const getRandomNumber = () => Math.floor(Math.random() * 101);
</script>
