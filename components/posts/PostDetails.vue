<template>
  <div>
    <Post :post="post" />
    <PostForm
      :user="user"
      :reply-to-id="post.id"
      @on-success="$emit('onReply')"
    />
    <ListFeed :posts="post.replies" />
  </div>
</template>
<script setup lang="ts">
import { IPost } from '~/types/post-client-types';
import { IUser } from '~/types/auth-types';
import PostForm from '~/components/posts/form/PostForm.vue';
import Post from '~/components/posts/Post.vue';
import ListFeed from '~/components/posts/ListFeed.vue';

defineProps<{
  post: IPost;
  user: IUser;
}>();

defineEmits<{
  onReply: [];
}>();
</script>
