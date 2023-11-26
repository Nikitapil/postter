<template>
  <div
    v-if="!chatList.length"
    class="text-center text-white font-bold text-lg"
  >
    No chats yet
  </div>
  <ul
    v-else
    class="py-2"
  >
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
import ChatListItem from '~/components/Chat/ChatList/ChatListItem.vue';

defineProps<{
  chatList: IChat[];
}>();
</script>
