<template>
  <div class="flex p-4 pb-2">
    <div>
      <img
        class="w-10 h-10 rounded-full"
        :src="post.author.profileImage"
        alt="Tweet author avatar"
      />
    </div>

    <div class="ml-3 w-full">
      <span class="font-medium text-gray-800 dark:text-white">{{
        post.author.name
      }}</span>

      <span class="text-sm font-medium text-gray-400 ml-3 w-full">
        <!--        TODO add link to user feed-->
        <NuxtLink
          class="mr-5"
          to="#"
        >
          @{{ post.author.username }}
        </NuxtLink>
        <span>{{ post.postedAt }}</span>
      </span>

      <div
        v-if="post.replyTo"
        class="text-sm"
      >
        <span class="text-gray-500">Replying to</span>
        <NuxtLink
          class="text-blue-400"
          :to="replyToTweetUrl"
        >
          @{{ post.replyTo.author.username }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IPost } from '~/types/tweet-client-types';

const props = defineProps<{
  post: IPost;
}>();
const replyToTweetUrl = computed(() => `/status/${props.post.replyTo?.id}`);
</script>
