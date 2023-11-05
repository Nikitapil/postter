<template>
  <div class="flex p-4 pb-2">
    <div>
      <UserAvatar :link="post.author.profileImage" />
    </div>

    <div class="ml-3 w-full">
      <span class="font-medium text-gray-800 dark:text-white">
        {{ post.author.name }}
      </span>

      <span class="text-sm font-medium text-gray-400 ml-3 w-full">
        <!--        TODO add link to user feed-->
        <NuxtLink
          class="mr-5 hover:text-gray-500 default-transition"
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
          :to="replyToUrl"
        >
          @{{ post.replyTo.author.username }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IPost } from '~/types/post-client-types';
import UserAvatar from '~/components/ui/UserAvatar.vue';

const props = defineProps<{
  post: IPost;
}>();
const replyToUrl = computed(() => `/status/${props.post.replyTo?.id}`);
</script>
