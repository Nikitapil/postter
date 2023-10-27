<template>
  <img
    v-if="link"
    class="w-10 h-10 rounded-full"
    :src="link"
    alt="user avatar"
  />
  <div
    v-else
    class="h-10 w-10 dark:text-white"
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
