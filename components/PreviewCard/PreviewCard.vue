<template>
  <div
    class="m-2 border-gray-200 dark:border-gray-500 border bg-gray-100 dark:bg-dim-700 rounded-2xl overflow-hidden"
  >
    <h1
      class="text-xl font-extrabold text-gray-900 border-gray-200 dark:border-gray-500 border-b dark:text-white p-3"
    >
      {{ title }}
    </h1>

    <slot />

    <NuxtLink
      class="text-sm text-blue-400 p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-dim-300 default-transition block"
      :to="showMoreLink"
    >
      Show more
    </NuxtLink>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  title: string;
  showMoreLink: string;
}>();
</script>
