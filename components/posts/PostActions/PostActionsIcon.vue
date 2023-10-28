<template>
  <div
    class="flex items-center text-gray-400 cursor-pointer group"
    @click.stop.prevent="$emit('click')"
  >
    <div
      class="p-2 rounded-full dark:group-hover:bg-opacity-20 default-transition"
      :class="`group-hover:bg-${appearance}-100 group-hover:text-${appearance}-400 ${
        active ? `text-${appearance}-400` : ''
      }`"
    >
      <slot
        name="icon"
        classes="w-5 h-5"
      />
    </div>

    <span
      class="ml-1 default-transition"
      :class="`group-hover:text-${appearance}-400 ${
        active ? `text-${appearance}-400` : ''
      }`"
    >
      <slot />
    </span>
  </div>
</template>
<script setup lang="ts">
withDefaults(
  defineProps<{
    active?: boolean;
    appearance?: 'blue' | 'green' | 'red';
  }>(),
  {
    active: false,
    appearance: 'blue'
  }
);

defineEmits<{
  click: [];
}>();
</script>
