<template>
  <button
    class="flex justify-center text-white bg-blue-400 rounded-full hover:bg-blue-500 cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed default-transition"
    :class="classes"
    :disabled="disabled"
  >
    <span>
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    size?: string;
    liquid?: boolean;
  }>(),
  {
    size: 'md',
    liquid: false
  }
);

const computedClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-3 py-2 text-sm';
    case 'lg':
      return 'px-4 py-3 text-md';
    default:
      return 'py-2 px-3 text-sm';
  }
});

const classes = computed(
  () => `${computedClasses.value} ${props.liquid ? 'w-full' : 'w-min'}`
);
</script>
