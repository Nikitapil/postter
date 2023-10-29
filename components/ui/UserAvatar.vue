<template>
  <img
    v-if="link"
    class="w-10 h-10 rounded-full"
    :src="link"
    alt="user avatar"
  />
  <div
    v-else
    class="h-10 w-10 p-1 rounded-full border text-gray-700 dark:text-dim-100"
  >
    <UserIcon />
  </div>
</template>

<script setup lang="ts">
import { UserIcon } from '@heroicons/vue/24/solid';

defineProps<{
  link: string | null;
}>();
</script>
