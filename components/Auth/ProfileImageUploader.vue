<template>
  <input
    id="profile-image"
    type="file"
    hidden
    accept="image/png, image/gif, image/jpeg"
    :disabled="loading"
    @change="handleProfileImageChange"
  />
  <div class="flex w-full justify-between items-center">
    <img
      v-if="profileImageUrl"
      class="w-12 h-12 rounded-full"
      :src="profileImageUrl"
      alt="Your profile avatar"
    />
    <button
      v-if="modelValue"
      class="hover:underline text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white block mr-auto ml-2 default-transition"
      :disabled="loading"
      @click="onDeleteProfileImage"
    >
      <XMarkIcon class="w-4 h-4" />
    </button>
    <label
      for="profile-image"
      class="hover:underline w-fit cursor-pointer text-gray-100 dark:text-gray-700 block ml-auto bg-dim-800 dark:bg-white px-4 py-2 rounded-full disabled:cursor-not-allowed"
    >
      Upload profile image
    </label>
  </div>
</template>
<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/solid';
const props = defineProps<{
  loading: boolean;
  modelValue: File | null;
}>();

const emit = defineEmits<{
  'update:modelValue': [File | null];
}>();

const profileImageUrl = computed(() =>
  props.modelValue ? URL.createObjectURL(props.modelValue) : null
);

const handleProfileImageChange = (event: InputEvent) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    emit('update:modelValue', file);
  }
};

const onDeleteProfileImage = () => {
  emit('update:modelValue', null);
};
</script>
