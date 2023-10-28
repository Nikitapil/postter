<template>
  <div>
    <textarea
      rows="3"
      class="w-full p-2 resize-none text-lg text-gray-900 placeholder:text-gray-400 bg-transparent border-gray-200 dark:border-dim-300 rounded-xl dark:text-white focus:ring-0"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    </textarea>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  placeholder: string;
}>();

defineEmits<{
  'update:modelValue': [string];
}>();
</script>
