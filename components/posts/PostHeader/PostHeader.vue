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
          class="mr-5 link-gray"
          to="#"
        >
          @{{ post.author.username }}
        </NuxtLink>
        <span>{{ post.postedAt }}</span>
      </span>

      <PostHeaderAction
        v-if="post.replyTo"
        title="Reply to"
        :user-name="post.replyTo.author.username"
        :action-link-id="post.replyTo.id"
      />

      <PostHeaderAction
        v-else-if="post.repostFrom"
        title="Repost from"
        :user-name="post.repostFrom.author.username"
        :action-link-id="post.repostFrom.id"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IPost } from '~/types/post-client-types';
import UserAvatar from '~/components/ui/UserAvatar.vue';
import PostHeaderAction from '~/components/posts/PostHeader/PostHeaderAction.vue';

defineProps<{
  post: IPost;
}>();
</script>
