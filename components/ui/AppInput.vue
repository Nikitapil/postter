<template>
  <div>
    <label
        v-if="label"
        class="block pl-3 ml-px text-sm font-medium text-gray-700"
        for=""
    >
      {{ label }}
    </label>
    <div class="mt-1">
      <input
        class="block px-4 w-full border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-bue-500 sm:text-sm"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        @input="event => $emit('update:modelValue', event.target.value)"
    />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue: string;
  placeholder?: string;
  label?: string;
  type?: 'text' | 'password'
}>(), {
  placeholder: '',
  label: '',
  type: 'text'
})

defineEmits<{
  'update:modelValue': [string]
}>()
</script>