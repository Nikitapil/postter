<template>
  <div>
    <textarea
      ref="textAreaRef"
      rows="3"
      class="w-full p-2 resize-none text-lg text-gray-900 placeholder:text-gray-400 bg-transparent border-gray-200 dark:border-dim-300 rounded-xl dark:text-white focus:ring-0"
      :class="{
        'dark:bg-white': useContrastColors,
        'dark:!text-black': useContrastColors
      }"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    </textarea>
  </div>
</template>

<script setup lang="ts">
const textAreaRef = ref(null);

withDefaults(
  defineProps<{
    modelValue: string;
    placeholder: string;
    useContrastColors?: boolean;
  }>(),
  {
    useContrastColors: false
  }
);

defineEmits<{
  'update:modelValue': [string];
}>();

defineExpose({
  textAreaRef
});
</script>
