<template>
  <div
    class="flex items-center text-gray-400 cursor-pointer group"
    @click.stop.prevent="$emit('click')"
  >
    <div
      class="p-2 group-hover:bg-blue-100 group-hover:text-blue-400 rounded-full dark:group-hover:bg-opacity-20 default-transition"
    >
      <slot
        name="icon"
        classes="w-5 h-5"
      />
    </div>

    <span class="ml-1 group-hover:text-blue-400 default-transition">
      <slot />
    </span>
  </div>
</template>
<script setup lang="ts">
defineEmits<{
  click: [];
}>();
</script>
