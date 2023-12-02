<template>
  <div>
    <AppInputLabel
      :id="id"
      :value-length="valueLength"
      :label="label"
      :limit="limit"
    />
    <div class="mt-1">
      <input
        :id="id"
        class="block px-4 w-full border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-bue-500 sm:text-sm disabled:bg-gray-100"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="limit"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppInputLabel from '~/components/ui/inputs/AppInputLabel.vue';

const props = withDefaults(
  defineProps<{
    modelValue: string;
    placeholder?: string;
    label?: string;
    type?: 'text' | 'password';
    disabled: boolean;
    id: string;
    limit?: number;
  }>(),
  {
    placeholder: '',
    label: '',
    type: 'text',
    disabled: false
  }
);

defineEmits<{
  'update:modelValue': [string];
}>();

const valueLength = computed(() => props.modelValue.length);
</script>
