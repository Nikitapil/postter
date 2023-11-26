<template>
  <div
    class="max-w-xs bg-gray-700 p-2 rounded-md text-white"
    :class="{ '!bg-blue-700': isMyMessage }"
  >
    {{ message.text }}
  </div>
</template>

<script setup lang="ts">
import { IChatMessage } from '~/types/messages-client-types';

defineProps<{
  message: IChatMessage;
  isMyMessage: boolean;
}>();
</script>
