<template>
  <div>
    <label
      v-if="label"
      class="block pl-3 ml-px text-sm font-medium text-gray-700 dark:text-white"
      :for="id"
    >
      {{ label }}
    </label>
    <textarea
      :id="id"
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
    id?: string;
    label?: string;
  }>(),
  {
    useContrastColors: false,
    id: '',
    label: ''
  }
);

defineEmits<{
  'update:modelValue': [string];
}>();

defineExpose({
  textAreaRef
});
</script>
