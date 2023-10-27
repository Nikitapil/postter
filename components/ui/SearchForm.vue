<template>
  <form @submit.prevent="handleSearch" class="relative m-2">
    <div
      class="absolute flex items-center h-full pl-4 text-gray-600 cursor-pointer"
    >
      <button class="w-6 h-6 block">
        <MagnifyingGlassIcon />
      </button>
    </div>
    <input
      v-model="value"
      class="flex items-center w-full pl-12 text-sm font-normal text-gray-800 dark:text-gray-100 bg-gray-200 border border-gray-200 rounded-full shadow dark:bg-dim-400 dark:border-dim-400 focus:bg-gray-100 dark:focus:bg-dim-200 h-9"
      type="text"
      placeholder="Search tweets"
    />
  </form>
</template>
<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

const value = ref('');

const emit = defineEmits<{
  search: [string];
}>();

const handleSearch = () => {
  emit('search', value.value);
};
</script>
