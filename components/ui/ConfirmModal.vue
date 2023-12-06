<template>
  <Modal
    :is-open="isOpen"
    @close-modal="closeModal"
  >
    <h2 class="text-center mb-5 text-xl font-semibold dark:text-white">
      {{ title }}
    </h2>

    <div class="flex w-full gap-2">
      <button
        class="button bg-red-700"
        @click="closeModal"
      >
        Cancel
      </button>
      <button
        class="button bg-blue-500"
        @click="$emit('confirm')"
      >
        Confirm
      </button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '~/components/ui/Modal.vue';
defineProps<{
  isOpen: boolean;
  title: string;
}>();

const emit = defineEmits<{
  closeModal: [];
  confirm: [];
}>();

const closeModal = () => {
  emit('closeModal');
};
</script>

<style scoped>
.button {
  @apply px-4 py-2 border-none flex-1 outline-none rounded-xl text-white hover:opacity-90 default-transition;
}
</style>
