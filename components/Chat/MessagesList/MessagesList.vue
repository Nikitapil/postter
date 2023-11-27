<template>
  <div
    v-if="!messages.length"
    class="text-center text-white font-bold text-lg"
  >
    No messages yet
  </div>
  <ul class="flex flex-col gap-5 px-8 py-4">
    <li
      v-for="message in messages"
      :key="message.id"
      :class="{ 'ml-auto': userId === message.authorId }"
    >
      <MessageListItem
        :message="message"
        :is-my-message="userId === message.authorId"
      />
    </li>
    <li ref="lastItem" />
    <ScrollObserver @intersect="$emit('endOfChat')" />
  </ul>
</template>
<script setup lang="ts">
import { IChatMessage } from '~/types/messages-client-types';
import MessageListItem from '~/components/Chat/MessagesList/MessageListItem.vue';
import ScrollObserver from '~/components/ui/ScrollObserver.vue';

defineProps<{
  messages: IChatMessage[];
  userId: string;
}>();

const lastItem = ref<HTMLLIElement | null>(null);

defineEmits<{
  endOfChat: [];
}>();

onMounted(() => {
  lastItem.value?.scrollIntoView();
});
</script>
