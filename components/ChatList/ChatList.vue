<template>
  <ul class="py-2">
    <li
      v-for="chat in chatList"
      :key="chat.id"
    >
      <ChatListItem :chat="chat" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { IChat } from '~/types/messages-client-types';
import ChatListItem from '~/components/ChatList/ChatListItem.vue';

defineProps<{
  chatList: IChat[];
}>();
</script>
