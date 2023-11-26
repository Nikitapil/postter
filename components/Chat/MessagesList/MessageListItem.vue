<template>
  <div
    class="flex flex-col max-w-xs bg-gray-700 p-2 rounded-md text-white"
    :class="{ '!bg-blue-700': isMyMessage }"
  >
    <h3
      class="text-xs text-blue-400 font-bold mb-2"
      :class="{ 'text-blue-200': isMyMessage }"
    >
      {{ message.author.name }} @{{ message.author.username }}
    </h3>
    <p>{{ message.text }}</p>
    <p class="ml-auto text-xs text-gray-300">{{ dateText }}</p>
  </div>
</template>

<script setup lang="ts">
import { IChatMessage } from '~/types/messages-client-types';

const props = defineProps<{
  message: IChatMessage;
  isMyMessage: boolean;
}>();

const dateText = computed(() =>
  new Date(props.message.createdAt).toLocaleDateString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  })
);
</script>
