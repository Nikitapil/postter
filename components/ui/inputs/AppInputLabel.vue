<template>
  <div
    class="flex justify-between text-sm font-medium text-gray-700 dark:text-white"
  >
    <label
      v-if="label"
      class="pl-3 cursor-pointer"
      :for="id"
    >
      {{ label }}
    </label>
    <div v-if="limit">{{ valueLength }}/{{ limit }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string;
  label?: string;
  limit?: number;
  valueLength: number;
}>();
</script>
