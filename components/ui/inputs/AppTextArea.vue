<template>
  <div>
    <AppInputLabel
      :id="id"
      :value-length="valueLength"
      :label="label"
      :limit="limit"
    />
    <textarea
      :id="id"
      ref="textAreaRef"
      rows="3"
      class="w-full p-2 resize-none text-lg text-gray-900 placeholder:text-gray-400 bg-transparent border-gray-200 dark:border-dim-300 rounded-xl dark:text-white focus:ring-0 disabled:opacity-75"
      :class="{
        'dark:bg-white': useContrastColors,
        'dark:!text-black': useContrastColors
      }"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="limit"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    </textarea>
  </div>
</template>

<script setup lang="ts">
import AppInputLabel from '~/components/ui/inputs/AppInputLabel.vue';

const textAreaRef = ref(null);

const props = withDefaults(
  defineProps<{
    modelValue: string;
    placeholder: string;
    useContrastColors?: boolean;
    id?: string;
    label?: string;
    disabled?: boolean;
    limit?: number;
  }>(),
  {
    useContrastColors: false,
    id: '',
    label: '',
    disabled: false
  }
);

defineEmits<{
  'update:modelValue': [string];
}>();

const valueLength = computed(() => props.modelValue.length);

defineExpose({
  textAreaRef
});
</script>
