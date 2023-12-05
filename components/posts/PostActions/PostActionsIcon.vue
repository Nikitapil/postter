<template>
  <button
    class="flex items-center text-gray-400 cursor-pointer group"
    @click.stop.prevent="$emit('click')"
  >
    <div
      class="p-2 rounded-full dark:group-hover:bg-opacity-20 default-transition"
      :class="iconClasses"
    >
      <slot
        name="icon"
        classes="w-5 h-5"
      />
    </div>

    <span
      class="ml-1 default-transition"
      :class="textClasses"
    >
      <slot />
    </span>
  </button>
</template>
<script setup lang="ts">
const props = withDefaults(
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

const iconClasses = computed(() => {
  const hoverBg = `group-hover:bg-${props.appearance}-100`;
  const hoverText = `group-hover:text-${props.appearance}-400`;
  const activeText = props.active ? `text-${props.appearance}-400` : '';
  return `${hoverBg} ${hoverText} ${activeText}`;
});

const textClasses = computed(() => {
  const hoverClass = `group-hover:text-${props.appearance}-400`;
  const activeText = props.active ? `text-${props.appearance}-400` : '';
  return `${hoverClass} ${activeText}`;
});
</script>
