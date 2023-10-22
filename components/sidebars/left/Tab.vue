<template>
  <NuxtLink
    class="flex items-center rounded-full gap-4 p-3 w-min hover:bg-gray-200 dark:hover:bg-dim-200 dark:text-white default-transition"
    to="#"
  >
    <div class="w-6 h-6">
      <slot name="icon" />
    </div>
    <div
      class="hidden text-xl xl:block"
      :class="textClasses"
    >
      <slot name="name" />
    </div>
  </NuxtLink>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    active?: boolean;
  }>(),
  {
    active: false
  }
);

const textClasses = computed(() =>
  props.active ? 'font-semibold' : 'font-normal'
);
</script>
