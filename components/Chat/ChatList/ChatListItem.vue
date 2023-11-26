<template>
  <NuxtLink
    :to="linkToChat"
    class="block bg-blue-100 dark:bg-dim-300 w-full border-b p-3 dark:text-white cursor-pointer hover:bg-blue-200 dark:hover:bg-dim-400 default-transition overflow-hidden"
  >
    <h3 class="text-xs text-blue-900 dark:text-blue-400 font-bold mb-2">
      {{ chat.companionUser.name }} @{{ chat.companionUser.username }}
    </h3>
    <p
      v-if="lastMessage"
      class="text-sm line-clamp-2 text-ellipsis"
    >
      {{ lastMessage.text }}
    </p>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { IChat } from '~/types/messages-client-types';

const props = defineProps<{
  chat: IChat;
}>();

const lastMessage = computed(() => props.chat.messages.at(-1));

const linkToChat = computed(() => `/chat/${props.chat.id}`);
</script>
