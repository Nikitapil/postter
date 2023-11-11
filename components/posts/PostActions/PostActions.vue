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

    <PostActionsIcon
      appearance="green"
      @click="$emit('repostClick')"
    >
      <template #icon="{ classes }">
        <ArrowPathIcon :class="classes" />
      </template>

      <template #default>
        {{ post.repostsCount }}
      </template>
    </PostActionsIcon>

    <PostActionsIcon
      appearance="red"
      :active="post.isLiked"
      @click="$emit('likeClick')"
    >
      <template #icon="{ classes }">
        <HeartIcon :class="classes" />
      </template>

      <template #default>
        {{ post.likesCount }}
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
import { IPost } from '~/types/post-client-types';
import PostActionsIcon from '~/components/posts/PostActions/PostActionsIcon.vue';

defineProps<{
  post: IPost;
}>();

defineEmits<{
  commentClick: [];
  likeClick: [];
  repostClick: [];
}>();
</script>
